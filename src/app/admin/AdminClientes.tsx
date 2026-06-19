import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Search, Users, TrendingUp, UserCheck, UserX } from "lucide-react";
import { customers, customerSegments, ageDistribution, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;
const segColors: Record<string, string> = { Fiel: C.green, Frequente: C.blue, Ocasional: C.gold, Inativo: C.red };

const radarData = [
  { metric: "Frequência",  Fiel: 95, Frequente: 65, Ocasional: 35, Inativo: 10 },
  { metric: "Ticket",      Fiel: 80, Frequente: 55, Ocasional: 40, Inativo: 60 },
  { metric: "Antiguidade", Fiel: 90, Frequente: 60, Ocasional: 30, Inativo: 50 },
  { metric: "Economia",    Fiel: 88, Frequente: 55, Ocasional: 30, Inativo: 45 },
  { metric: "Variedade",   Fiel: 75, Frequente: 60, Ocasional: 45, Inativo: 55 },
];

export function AdminClientes({ isMobile }: { isMobile: boolean }) {
  const [search, setSearch] = useState("");
  const [filterSeg, setFilterSeg] = useState("Todos");
  const [sortBy, setSortBy] = useState<"gasto" | "compras" | "ticketMedio">("gasto");

  const filtered = customers
    .filter((c) => {
      const q = search.toLowerCase();
      return (c.nome.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)) &&
        (filterSeg === "Todos" || c.segmento === filterSeg);
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Cadastro de Clientes" sub={`${customers.length} clientes · filtros e ordenação`} />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {customerSegments.map((seg) => {
          const Icon = seg.segment === "Fiel" ? UserCheck : seg.segment === "Inativo" ? UserX : seg.segment === "Frequente" ? TrendingUp : Users;
          return <KpiCard key={seg.segment} label={seg.segment} value={String(seg.count)} sub={seg.desc} icon={Icon} accent={seg.color} />;
        })}
      </div>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Faixas etárias</SectionTitle>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={ageDistribution} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={C.border} />
              <XAxis type="number" tick={axisStyle(true)} axisLine={false} tickLine={false} />
              <YAxis dataKey="faixa" type="category" tick={axisStyle()} axisLine={false} tickLine={false} width={42} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, _, p) => [`${v} clientes (${p.payload.pct}%)`, "Faixa"]} />
              <Bar dataKey="clientes" fill={C.green} radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Perfil comparativo por segmento</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={70}>
              <PolarGrid stroke={C.border} />
              <PolarAngleAxis dataKey="metric" tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, fill: C.muted }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              {Object.entries(segColors).map(([seg, color]) => (
                <Radar key={seg} name={seg} dataKey={seg} stroke={color} fill={color} fillOpacity={0.07} strokeWidth={2} />
              ))}
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {Object.entries(segColors).map(([seg, color]) => (
              <div key={seg} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 3, borderRadius: 2, background: color }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: C.muted }}>{seg}</span>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Table */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 160, display: "flex", alignItems: "center", gap: 8, background: C.surface, borderRadius: 9, padding: "7px 12px", border: `1px solid ${C.border}` }}>
            <Search size={13} style={{ color: C.muted, flexShrink: 0 }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." style={{ background: "none", border: "none", outline: "none", fontFamily: "'Nunito', sans-serif", fontSize: "0.82rem", color: C.text, flex: 1, minWidth: 0 }} />
          </div>
          {["Todos", "Fiel", "Frequente", "Ocasional", "Inativo"].map((seg) => (
            <button key={seg} onClick={() => setFilterSeg(seg)} style={{ padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", background: filterSeg === seg ? C.green : C.surface, color: filterSeg === seg ? "#fff" : C.muted }}>
              {seg}
            </button>
          ))}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 8px", fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: C.muted, cursor: "pointer" }}>
            <option value="gasto">Gasto total</option>
            <option value="compras">Nº compras</option>
            <option value="ticketMedio">Ticket médio</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
            <thead>
              <tr>
                {["Cliente", "Seg.", "Compras", "Gasto", "Ticket", "Poupado", "Última"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 8px", textAlign: h === "Cliente" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "9px 8px" }}>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text, margin: 0 }}>{c.nome}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.muted, margin: 0 }}>{c.id}</p>
                  </td>
                  <td style={{ textAlign: "right", padding: "9px 8px" }}>
                    <span style={{ padding: "2px 6px", borderRadius: 5, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", background: `${segColors[c.segmento]}22`, color: segColors[c.segmento] }}>{c.segmento}</span>
                  </td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 8px" }}>{c.compras}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 8px" }}>R$ {c.gasto.toLocaleString("pt-BR")}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 8px" }}>R$ {c.ticketMedio.toFixed(0)}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.green, textAlign: "right", padding: "9px 8px" }}>R$ {c.poupado.toLocaleString("pt-BR")}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.muted, textAlign: "right", padding: "9px 8px" }}>{c.ultimaCompra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, marginTop: 10, textAlign: "right" }}>
          {filtered.length} cliente{filtered.length !== 1 ? "s" : ""}
        </p>
      </Card>
    </div>
  );
}
