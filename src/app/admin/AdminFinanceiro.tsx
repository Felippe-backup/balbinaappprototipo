import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { DollarSign, CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import {
  paymentMethods, cashierPerformance, marginByCategory,
  dailyComparison, promotionROI, COLORS,
} from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

export function AdminFinanceiro({ isMobile }: { isMobile: boolean }) {
  const totalReceita = cashierPerformance.reduce((s, c) => s + c.receita, 0);
  const totalTx      = cashierPerformance.reduce((s, c) => s + c.transacoes, 0);
  const totalErros   = cashierPerformance.reduce((s, c) => s + c.erros, 0);
  const bestCashier  = [...cashierPerformance].sort((a, b) => b.receita - a.receita)[0];

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Financeiro" sub="Métricas de receita, margem, caixas e formas de pagamento" />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Receita semana"   value={`R$ ${(totalReceita / 1000).toFixed(1)}k`} sub="todos os caixas"  trend={+7}  icon={DollarSign}  accent={C.green}  />
        <KpiCard label="Margem média"     value="19,4%"                                      sub="bruta ponderada" trend={+1}  icon={TrendingUp}  accent={C.teal}   />
        <KpiCard label="Ticket médio"     value="R$ 33,98"                                   sub="por transação"   trend={+2}  icon={DollarSign}  accent={C.gold}   />
        <KpiCard label="Erros de caixa"   value={String(totalErros)}                         sub="esta semana"     trend={-3}  icon={AlertCircle} accent={C.red}    />
      </div>

      {/* Daily comparison + payment methods */}
      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Comparativo semanal — semana atual vs. anterior vs. ano anterior</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyComparison}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="day" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [
                `R$ ${v.toLocaleString("pt-BR")}`,
                n === "semanaAtual" ? "Esta semana" : n === "semanaAnterior" ? "Semana ant." : "Ano anterior",
              ]} />
              <Line type="monotone" dataKey="semanaAtual"    stroke={C.green}  strokeWidth={2.5} dot={{ fill: C.green, r: 3, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="semanaAnterior" stroke={C.gold}   strokeWidth={1.8} strokeDasharray="4 2" dot={false} />
              <Line type="monotone" dataKey="anoAnterior"    stroke={C.muted}  strokeWidth={1.5} strokeDasharray="2 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
            {[["Esta semana", C.green], ["Semana ant.", C.gold], ["Ano anterior", C.muted]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 2.5, borderRadius: 2, background: c as string }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Formas de pagamento — semana</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={paymentMethods} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2}>
                {paymentMethods.map((e) => <Cell key={e.method} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {paymentMethods.map((m) => (
              <div key={m.method} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: m.fill, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: C.muted, flex: 1 }}>{m.method}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text }}>{m.pct}%</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.muted }}>R$ {m.value.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Cashier performance */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Performance por caixa — semana</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead>
              <tr>
                {["Caixa / Operador", "Transações", "Receita", "Ticket médio", "Tempo médio", "Erros"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: C.muted, padding: "5px 10px", textAlign: h === "Caixa / Operador" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cashierPerformance.map((c, i) => {
                const isBest = c.nome === bestCashier.nome;
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: isBest ? `${C.green}0a` : "transparent" }}>
                    <td style={{ padding: "10px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.text, margin: 0 }}>{c.nome}</p>
                        {isBest && <span style={{ padding: "1px 6px", borderRadius: 5, background: `${C.green}22`, color: C.green, fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", fontWeight: 700 }}>Top</span>}
                      </div>
                    </td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "10px 10px" }}>{c.transacoes}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "10px 10px" }}>R$ {c.receita.toLocaleString("pt-BR")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "10px 10px" }}>R$ {c.ticketMedio.toFixed(2).replace(".", ",")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.muted, textAlign: "right", padding: "10px 10px" }}>{c.tempoMedio}</td>
                    <td style={{ textAlign: "right", padding: "10px 10px" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: c.erros > 5 ? C.red : c.erros > 2 ? C.gold : C.green, fontWeight: 500 }}>
                        {c.erros}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `1px solid ${C.border}` }}>
                <td style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: C.muted, padding: "8px 10px" }}>Total</td>
                <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "8px 10px", fontWeight: 500 }}>{totalTx}</td>
                <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.green, textAlign: "right", padding: "8px 10px", fontWeight: 500 }}>R$ {totalReceita.toLocaleString("pt-BR")}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Margins */}
      <Card>
        <SectionTitle>Margem por categoria</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={marginByCategory} barGap={4} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
            <XAxis dataKey="categoria" tick={axisStyle()} axisLine={false} tickLine={false} angle={isMobile ? -35 : 0} textAnchor={isMobile ? "end" : "middle"} height={isMobile ? 44 : 20} />
            <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`${v}%`, n === "margemBruta" ? "Margem bruta" : "Margem líquida"]} />
            <Bar dataKey="margemBruta"   fill={C.green}  radius={[4, 4, 0, 0]} name="margemBruta" />
            <Bar dataKey="margemLiquida" fill={C.teal}   radius={[4, 4, 0, 0]} name="margemLiquida" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          {[["Margem bruta", C.green], ["Margem líquida", C.teal]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c as string }} />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: C.muted }}>{l}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
