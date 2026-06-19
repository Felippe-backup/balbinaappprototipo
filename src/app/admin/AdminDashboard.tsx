import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp, AlertTriangle, Tag, Clock, Award } from "lucide-react";
import { revenueByDay, revenueByMonth, hourlyHeatmap, topProducts, categoryShare, stockAlerts, promotionROI, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;
const HEATMAP_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const maxHeat = Math.max(...hourlyHeatmap.flatMap((r) => HEATMAP_DAYS.map((d) => (r as Record<string, number>)[d])));

function HeatCell({ value, max }: { value: number; max: number }) {
  const p = value / max;
  const bg = p === 0 ? C.surface : p < 0.25 ? "#1e3d1e" : p < 0.5 ? "#2d5a2d" : p < 0.75 ? "#2d7a2d" : "#3daa3d";
  return (
    <div title={`${value} transações`} style={{ flex: 1, height: 22, borderRadius: 3, background: bg, cursor: "default" }} />
  );
}

export function AdminDashboard({ isMobile }: { isMobile: boolean }) {
  const weekRevenue = revenueByDay.reduce((s, d) => s + d.receita, 0);
  const weekTx = revenueByDay.reduce((s, d) => s + d.transacoes, 0);
  const criticalAlerts = stockAlerts.filter((s) => s.status === "crítico").length;

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Visão Geral" sub="Semana 10–16/06/2024 · Atualizado às 18:42" />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Receita semana"   value={`R$ ${(weekRevenue / 1000).toFixed(0)}k`} sub="vs. sem. anterior" trend={+7}  icon={DollarSign}    accent={C.green}  />
        <KpiCard label="Transações"       value={weekTx.toLocaleString("pt-BR")}            sub="esta semana"       trend={+5}  icon={ShoppingCart}  accent={C.blue}   />
        <KpiCard label="Ticket médio"     value="R$ 33,98"                                  sub="últimos 7 dias"    trend={+2}  icon={Award}         accent={C.gold}   />
        <KpiCard label="Meta do mês"      value="53%"                                       sub="R$ 76k / R$ 145k"  trend={-15} icon={TrendingUp}    accent={C.orange} />
        <KpiCard label="Clientes ativos"  value="2.600"                                     sub="com CPF cadastrado" trend={+18} icon={Users}         accent={C.purple} />
        <KpiCard label="Alertas estoque"  value={`${criticalAlerts} críticos`}              sub="reposição urgente"              icon={AlertTriangle} accent={C.red}    />
        <KpiCard label="Promoções ativas" value="12"                                        sub="em vigência"        trend={+2}  icon={Tag}           accent={C.teal}   />
        <KpiCard label="Pico hoje"        value="17h – 100 tx"                              sub="maior volume hora"              icon={Clock}         accent={C.muted}  />
      </div>

      {/* Revenue charts */}
      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Receita diária — semana</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueByDay} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="day" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Receita"]} />
              <Bar dataKey="receita" fill={C.green} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionTitle>Receita vs. Meta — 2024</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="month" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`R$ ${v.toLocaleString("pt-BR")}`, n === "receita" ? "Realizado" : "Meta"]} />
              <Line type="monotone" dataKey="receita" stroke={C.green} strokeWidth={2.5} dot={{ fill: C.green, r: 3, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="meta" stroke={C.gold} strokeWidth={2} strokeDasharray="5 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[["Realizado", C.green], ["Meta", C.gold]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 14, height: 2.5, borderRadius: 2, background: c as string }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Heatmap – desktop only */}
      {!isMobile && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTitle>Mapa de calor — transações por hora × dia</SectionTitle>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 26 }}>
              {hourlyHeatmap.map((r) => (
                <div key={r.hour} style={{ height: 22, display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: C.muted, width: 26 }}>{r.hour}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                {HEATMAP_DAYS.map((d) => (
                  <div key={d} style={{ flex: 1, textAlign: "center" }}>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {hourlyHeatmap.map((row) => (
                  <div key={row.hour} style={{ display: "flex", gap: 3 }}>
                    {HEATMAP_DAYS.map((d) => (
                      <HeatCell key={d} value={(row as Record<string, number>)[d]} max={maxHeat} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10, justifyContent: "flex-end" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: C.muted }}>Baixo</span>
            {["#1e3d1e", "#2d5a2d", "#2d7a2d", "#3daa3d"].map((c) => (
              <div key={c} style={{ width: 14, height: 8, borderRadius: 2, background: c }} />
            ))}
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: C.muted }}>Alto</span>
          </div>
        </Card>
      )}

      {/* Top products + category */}
      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Top 5 produtos — semana</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topProducts.slice(0, 5).map((p, i) => {
              const max = topProducts[0].receita;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.muted, width: 12, flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.text }}>{p.nome}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.text }}>R$ {p.receita.toLocaleString("pt-BR")}</span>
                    </div>
                    <div style={{ height: 5, background: C.surface, borderRadius: 3 }}>
                      <div style={{ width: `${(p.receita / max) * 100}%`, height: "100%", background: C.green, borderRadius: 3 }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: p.crescimento >= 0 ? C.green : C.red, width: 30, textAlign: "right", flexShrink: 0 }}>
                    {p.crescimento >= 0 ? "+" : ""}{p.crescimento}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <SectionTitle>Receita por categoria</SectionTitle>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryShare} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={2}>
                {categoryShare.map((e) => <Cell key={e.name} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 8px" }}>
            {categoryShare.map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: 2, background: c.fill, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: C.muted }}>{c.name} {c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Promotion ROI */}
      <Card>
        <SectionTitle>ROI das promoções ativas</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
            <thead>
              <tr>
                {["Promoção", "Investimento", "Retorno", "ROI", "Unidades"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 10px", textAlign: h === "Promoção" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {promotionROI.map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text, padding: "9px 10px" }}>{r.nome}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.muted,  textAlign: "right", padding: "9px 10px" }}>R$ {r.investimento.toLocaleString("pt-BR")}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text,  textAlign: "right", padding: "9px 10px" }}>R$ {r.retorno.toLocaleString("pt-BR")}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.green, textAlign: "right", padding: "9px 10px", fontWeight: 500 }}>{r.roi}%</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text,  textAlign: "right", padding: "9px 10px" }}>{r.unidades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
