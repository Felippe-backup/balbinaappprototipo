import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserCheck, UserX, TrendingUp, Star, ShoppingBag } from "lucide-react";
import { customers, customerSegments, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

const retentionTrend = [
  { mes: "Jan", retencao: 74, reativacao: 12 },
  { mes: "Fev", retencao: 76, reativacao: 14 },
  { mes: "Mar", retencao: 78, reativacao: 18 },
  { mes: "Abr", retencao: 75, reativacao: 15 },
  { mes: "Mai", retencao: 80, reativacao: 21 },
  { mes: "Jun", retencao: 82, reativacao: 19 },
];

const baseGrowth = [
  { mes: "Jan", total: 2180, novos: 120 },
  { mes: "Fev", total: 2260, novos: 98 },
  { mes: "Mar", total: 2360, novos: 142 },
  { mes: "Abr", total: 2450, novos: 118 },
  { mes: "Mai", total: 2540, novos: 134 },
  { mes: "Jun", total: 2600, novos: 86 },
];

const segColors: Record<string, string> = {
  Fiel: C.green, Frequente: C.blue, Ocasional: C.gold, Inativo: C.red,
};

const catFavorites: Record<string, string> = {
  "CPF-001": "Laticínios, Grãos",
  "CPF-002": "Hortifruti, Bebidas",
  "CPF-003": "Carnes, Laticínios",
  "CPF-004": "Grãos, Mercearia",
  "CPF-005": "Laticínios, Limpeza",
  "CPF-006": "Hortifruti",
  "CPF-007": "Carnes, Grãos",
  "CPF-008": "Carnes, Bebidas",
  "CPF-009": "Hortifruti, Massas",
  "CPF-010": "Laticínios, Carnes",
  "CPF-011": "Mercearia",
  "CPF-012": "Grãos, Limpeza",
};

export function AdminCRM({ isMobile }: { isMobile: boolean }) {
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const totalAtivos = customerSegments.filter((s) => s.segment !== "Inativo").reduce((sum, s) => sum + s.count, 0);
  const inativos = customerSegments.find((s) => s.segment === "Inativo")!.count;
  const retencao = Math.round((totalAtivos / (totalAtivos + inativos)) * 100);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="CRM" sub="Gestão de relacionamento, retenção e crescimento de base" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Total clientes"   value="2.600"             sub="base ativa"           trend={+18} icon={Users}     accent={C.green}  />
        <KpiCard label="Ativos (90d)"     value={String(totalAtivos)} sub="compraram recente"  trend={+5}  icon={UserCheck} accent={C.blue}   />
        <KpiCard label="Taxa retenção"    value={`${retencao}%`}    sub="vs. mês anterior"     trend={+2}  icon={TrendingUp} accent={C.teal}  />
        <KpiCard label="Inativos"         value={String(inativos)}  sub="sem compra há 90d+"   trend={-8}  icon={UserX}    accent={C.red}    />
      </div>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Retenção e reativação — 2024</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={retentionTrend}>
              <defs>
                <linearGradient id="gRet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.green} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="gRea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.blue} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`${v}%`, n === "retencao" ? "Retenção" : "Reativação"]} />
              <Area type="monotone" dataKey="retencao"   stroke={C.green} strokeWidth={2} fill="url(#gRet)" />
              <Area type="monotone" dataKey="reativacao" stroke={C.blue}  strokeWidth={2} fill="url(#gRea)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[["Retenção", C.green], ["Reativação", C.blue]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 12, height: 3, borderRadius: 2, background: c as string }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Crescimento da base</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={baseGrowth} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [v, n === "total" ? "Total" : "Novos"]} />
              <Bar dataKey="total" fill={`${C.green}44`} radius={[4, 4, 0, 0]} />
              <Bar dataKey="novos" fill={C.green}       radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Segment breakdown */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Distribuição de segmentos</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
          {customerSegments.map((seg) => {
            const pct = Math.round((seg.count / 2600) * 100);
            return (
              <div key={seg.segment} style={{ background: C.surface, borderRadius: 12, padding: "14px 16px", borderTop: `3px solid ${seg.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: C.text, margin: 0 }}>{seg.segment}</p>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: seg.color }}>{pct}%</span>
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1.1rem", color: C.text, margin: "0 0 4px" }}>{seg.count}</p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: 0 }}>{seg.desc}</p>
                <div style={{ marginTop: 8, height: 4, background: C.card, borderRadius: 2 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: seg.color, borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Customer table with profile panel */}
      <Card>
        <SectionTitle>Perfis de clientes — clique para detalhes</SectionTitle>
        <div style={{ display: "flex", gap: 16, flexDirection: isMobile ? "column" : "row" }}>
          <div style={{ flex: 1, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
              <thead>
                <tr>
                  {["Cliente", "Seg.", "Compras", "LTV", "Última"].map((h) => (
                    <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 8px", textAlign: h === "Cliente" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(selected?.id === c.id ? null : c)}
                    style={{ borderTop: `1px solid ${C.border}`, background: selected?.id === c.id ? `${C.green}11` : "transparent", cursor: "pointer" }}
                  >
                    <td style={{ padding: "9px 8px" }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text, margin: 0, whiteSpace: "nowrap" }}>{c.nome.split(" ").slice(0, 2).join(" ")}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.muted, margin: 0 }}>{c.id}</p>
                    </td>
                    <td style={{ textAlign: "right", padding: "9px 8px" }}>
                      <span style={{ padding: "2px 6px", borderRadius: 5, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", background: `${segColors[c.segmento]}22`, color: segColors[c.segmento] }}>{c.segmento}</span>
                    </td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 8px" }}>{c.compras}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 8px" }}>R$ {c.gasto.toLocaleString("pt-BR")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.muted, textAlign: "right", padding: "9px 8px" }}>{c.ultimaCompra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Profile panel */}
          {selected && (
            <div style={{ width: isMobile ? "100%" : 220, flexShrink: 0, background: C.surface, borderRadius: 12, padding: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${segColors[selected.segmento]}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.9rem", color: segColors[selected.segmento] }}>
                  {selected.nome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: C.text, margin: "0 0 2px" }}>{selected.nome.split(" ").slice(0, 2).join(" ")}</p>
              <span style={{ padding: "2px 8px", borderRadius: 6, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", background: `${segColors[selected.segmento]}22`, color: segColors[selected.segmento] }}>{selected.segmento}</span>

              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Idade",          val: `${selected.idade} anos`,                         icon: "👤" },
                  { label: "Compras",        val: String(selected.compras),                          icon: "🛒" },
                  { label: "LTV",            val: `R$ ${selected.gasto.toLocaleString("pt-BR")}`,    icon: "💰" },
                  { label: "Ticket médio",   val: `R$ ${selected.ticketMedio.toFixed(2).replace(".", ",")}`, icon: "🏷️" },
                  { label: "Poupado",        val: `R$ ${selected.poupado.toLocaleString("pt-BR")}`, icon: "💚" },
                  { label: "Última compra",  val: selected.ultimaCompra,                             icon: "📅" },
                  { label: "Cat. favoritas", val: catFavorites[selected.id] || "—",                 icon: "⭐" },
                ].map(({ label, val, icon }) => (
                  <div key={label} style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: "0.75rem", flexShrink: 0 }}>{icon}</span>
                    <div>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: C.muted, margin: 0 }}>{label}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, margin: 0 }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
