import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from "recharts";
import { topProducts, consumptionByAge, categoryShare, ageGroups, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";
import { Package, TrendingUp } from "lucide-react";

const C = COLORS;
const AGE_COLORS = [C.blue, C.green, C.gold, C.purple, C.orange];

const radarByAge = ageGroups.map((age) => {
  const entry: Record<string, number | string> = { faixa: age };
  consumptionByAge.forEach((p) => { entry[p.produto] = (p as Record<string, number | string>)[age] as number; });
  return entry;
});

export function AdminProdutos({ isMobile }: { isMobile: boolean }) {
  const [selectedProduct, setSelectedProduct] = useState(consumptionByAge[0].produto);
  const [viewMode, setViewMode] = useState<"receita" | "unidades">("receita");

  const productAgeData = consumptionByAge.find((p) => p.produto === selectedProduct);
  const ageBarData = productAgeData
    ? ageGroups.map((age, i) => ({ faixa: age, valor: (productAgeData as Record<string, number | string>)[age] as number, fill: AGE_COLORS[i] }))
    : [];

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Produtos" sub="Ranking, categorias e consumo por faixa etária" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="SKUs ativos"       value="284"        sub="+12 este mês"         trend={+4}  icon={Package}    accent={C.green}  />
        <KpiCard label="Mais vendido"      value="Leite 1L"   sub="2.890 unidades"                   icon={Package}    accent={C.blue}   />
        <KpiCard label="Maior receita"     value="Arroz 5kg"  sub="R$ 34.938"                        icon={TrendingUp} accent={C.gold}   />
        <KpiCard label="Maior crescimento" value="Café Pilão" sub="+22% vs. anterior"    trend={+22} icon={TrendingUp} accent={C.teal}   />
      </div>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionTitle>Ranking de produtos</SectionTitle>
            <div style={{ display: "flex", gap: 4 }}>
              {(["receita", "unidades"] as const).map((m) => (
                <button key={m} onClick={() => setViewMode(m)} style={{ padding: "4px 8px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", background: viewMode === m ? C.green : C.surface, color: viewMode === m ? "#fff" : C.muted }}>
                  {m === "receita" ? "R$" : "Qtd"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {topProducts.slice(0, 8).map((p, i) => {
              const maxVal = viewMode === "receita" ? Math.max(...topProducts.map((x) => x.receita)) : Math.max(...topProducts.map((x) => x.unidades));
              const val = viewMode === "receita" ? p.receita : p.unidades;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.muted, width: 12, flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: C.text }}>{p.nome}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.text }}>{viewMode === "receita" ? `R$ ${p.receita.toLocaleString("pt-BR")}` : p.unidades.toLocaleString("pt-BR")}</span>
                    </div>
                    <div style={{ height: 5, background: C.surface, borderRadius: 3 }}>
                      <div style={{ width: `${(val / maxVal) * 100}%`, height: "100%", background: C.green, borderRadius: 3 }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: p.crescimento >= 0 ? C.green : C.red, width: 32, textAlign: "right", flexShrink: 0 }}>
                    {p.crescimento >= 0 ? "+" : ""}{p.crescimento}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle>Receita por categoria</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryShare} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={C.border} />
              <XAxis type="number" tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={axisStyle()} axisLine={false} tickLine={false} width={66} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Receita"]} />
              <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                {categoryShare.map((e) => <Cell key={e.name} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Consumo por faixa etária — produto</SectionTitle>
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: C.text, cursor: "pointer", marginBottom: 12 }}>
            {consumptionByAge.map((p) => <option key={p.produto} value={p.produto}>{p.produto}</option>)}
          </select>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={ageBarData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="faixa" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} unidades`, "Consumo"]} />
              <Bar dataKey="valor" radius={[5, 5, 0, 0]}>
                {ageBarData.map((e, i) => <Cell key={i} fill={e.fill as string} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Perfil de consumo por faixa etária</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarByAge} cx="50%" cy="50%" outerRadius={80}>
              <PolarGrid stroke={C.border} />
              <PolarAngleAxis dataKey="faixa" tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, fill: C.muted }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              {consumptionByAge.slice(0, 5).map((p, i) => (
                <Radar key={p.produto} name={p.produto} dataKey={p.produto} stroke={AGE_COLORS[i]} fill={AGE_COLORS[i]} fillOpacity={0.07} strokeWidth={1.5} />
              ))}
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
    </div>
  );
}
