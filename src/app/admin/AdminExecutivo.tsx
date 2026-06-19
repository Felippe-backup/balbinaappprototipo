import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, Users, Award, Target, BarChart2, RefreshCw, Zap } from "lucide-react";
import { COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

const executiveKPIs = [
  { label: "Receita total 2024",  value: "R$ 736k",   sub: "vs meta R$ 850k", trend: +8,  icon: DollarSign,  accent: C.green  },
  { label: "Crescimento mês",     value: "+7,2%",     sub: "vs mês anterior", trend: +7,  icon: TrendingUp,  accent: C.teal   },
  { label: "LTV médio",           value: "R$ 1.840",  sub: "por cliente ativo",trend: +12, icon: Award,       accent: C.gold   },
  { label: "Ticket médio",        value: "R$ 33,98",  sub: "por transação",    trend: +2,  icon: DollarSign,  accent: C.blue   },
  { label: "CAC",                 value: "R$ 18,40",  sub: "custo por cliente",trend: -5,  icon: Target,      accent: C.purple },
  { label: "Churn rate",          value: "3,8%",      sub: "este mês",         trend: +10, icon: RefreshCw,   accent: C.red    },
  { label: "Cashback emitido",    value: "R$ 48,2k",  sub: "jan–jun 2024",     trend: +22, icon: Zap,         accent: C.orange },
  { label: "ROI campanhas",       value: "218%",      sub: "média geral",      trend: +14, icon: BarChart2,   accent: C.teal   },
];

const revenueYTD = [
  { mes: "Jan", receita: 128400, meta: 120000, lucro: 28200 },
  { mes: "Fev", receita: 115900, meta: 120000, lucro: 24400 },
  { mes: "Mar", receita: 134200, meta: 130000, lucro: 30800 },
  { mes: "Abr", receita: 142800, meta: 135000, lucro: 33600 },
  { mes: "Mai", receita: 138600, meta: 140000, lucro: 31400 },
  { mes: "Jun", receita: 76300,  meta: 145000, lucro: 17200 },
];

const freqTrend = [
  { mes: "Jan", freq: 1.8 },
  { mes: "Fev", freq: 1.9 },
  { mes: "Mar", freq: 2.1 },
  { mes: "Abr", freq: 2.0 },
  { mes: "Mai", freq: 2.2 },
  { mes: "Jun", freq: 2.3 },
];

const cashbackData = [
  { mes: "Jan", emitido: 8420, resgatado: 6840 },
  { mes: "Fev", emitido: 7860, resgatado: 6120 },
  { mes: "Mar", emitido: 9140, resgatado: 7640 },
  { mes: "Abr", emitido: 8680, resgatado: 7280 },
  { mes: "Mai", emitido: 9280, resgatado: 7820 },
  { mes: "Jun", emitido: 4820, resgatado: 3960 },
];

const couponData = [
  { name: "Resgatados",    value: 2140, fill: C.green  },
  { name: "Visualizados",  value: 6780, fill: C.blue   },
  { name: "Expirados",     value: 1240, fill: C.muted  },
];

const branchData = [
  { filial: "Matriz",    receita: 412000, clientes: 1480, ticket: 34.2 },
  { filial: "Filial Sul",receita: 192000, clientes: 720,  ticket: 32.8 },
  { filial: "Filial Norte",receita: 132000, clientes: 400, ticket: 33.4 },
];

export function AdminExecutivo({ isMobile }: { isMobile: boolean }) {
  const totalRevenue = revenueYTD.reduce((s, r) => s + r.receita, 0);
  const totalLucro = revenueYTD.reduce((s, r) => s + r.lucro, 0);
  const margemMedia = Math.round((totalLucro / totalRevenue) * 100);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      {/* Premium header */}
      <div style={{ marginBottom: 24, padding: isMobile ? "16px 18px" : "20px 24px", background: `linear-gradient(135deg, ${C.surface}, #0a1a0a)`, borderRadius: 16, border: `1px solid ${C.green}33` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.1em" }}>Relatório Executivo</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? "1.4rem" : "1.8rem", color: C.text, margin: "0 0 4px" }}>
          Business Intelligence
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: C.muted, margin: 0 }}>
          Dona Balbina · Jan–Jun 2024 · Consolidado · Margem bruta média: {margemMedia}%
        </p>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {executiveKPIs.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Revenue + Profit */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Receita · Meta · Lucro — Jan–Jun 2024</SectionTitle>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={revenueYTD} barGap={4} barSize={isMobile ? 12 : 20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
            <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`R$ ${v.toLocaleString("pt-BR")}`, n === "receita" ? "Receita" : n === "meta" ? "Meta" : "Lucro Bruto"]} />
            <Bar dataKey="receita" fill={C.green}      radius={[4, 4, 0, 0]} />
            <Bar dataKey="meta"    fill={`${C.gold}55`} radius={[4, 4, 0, 0]} />
            <Bar dataKey="lucro"   fill={C.teal}       radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
          {[["Receita", C.green], ["Meta", `${C.gold}aa`], ["Lucro Bruto", C.teal]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c as string }} />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
            </div>
          ))}
        </div>
      </Card>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        {/* Freq trend */}
        <Card>
          <SectionTitle>Frequência média de compra</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={freqTrend}>
              <defs>
                <linearGradient id="gFreq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.green} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} domain={[1.5, 2.5]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}x/mês`, "Frequência"]} />
              <Area type="monotone" dataKey="freq" stroke={C.green} strokeWidth={2.5} fill="url(#gFreq)" dot={{ fill: C.green, r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Coupon funnel */}
        <Card>
          <SectionTitle>Conversão de cupons</SectionTitle>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={couponData} dataKey="value" cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3}>
                {couponData.map((e) => <Cell key={e.name} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toLocaleString("pt-BR"), ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {couponData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: C.muted, flex: 1 }}>{d.name}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.text }}>{d.value.toLocaleString("pt-BR")}</span>
              </div>
            ))}
            <div style={{ marginTop: 4, padding: "6px 10px", background: `${C.green}18`, borderRadius: 8 }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: C.green }}>
                Taxa de conversão: {Math.round((couponData[0].value / couponData[1].value) * 100)}%
              </span>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Cashback */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Cashback emitido vs. resgatado — 2024</SectionTitle>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={cashbackData} barGap={4} barSize={isMobile ? 12 : 20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
            <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`R$ ${v.toLocaleString("pt-BR")}`, n === "emitido" ? "Emitido" : "Resgatado"]} />
            <Bar dataKey="emitido"   fill={`${C.green}66`} radius={[4, 4, 0, 0]} />
            <Bar dataKey="resgatado" fill={C.green}        radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Branch breakdown */}
      <Card>
        <SectionTitle>Performance por filial — acumulado 2024</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 360 }}>
            <thead>
              <tr>
                {["Filial", "Receita", "Clientes", "Ticket médio", "Participação"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 10px", textAlign: h === "Filial" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branchData.map((b, i) => {
                const totalRev = branchData.reduce((s, r) => s + r.receita, 0);
                const pct = Math.round((b.receita / totalRev) * 100);
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.text, padding: "11px 10px" }}>{b.filial}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "11px 10px" }}>R$ {b.receita.toLocaleString("pt-BR")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "11px 10px" }}>{b.clientes.toLocaleString("pt-BR")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right", padding: "11px 10px" }}>R$ {b.ticket.toFixed(1).replace(".", ",")}</td>
                    <td style={{ padding: "11px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                        <div style={{ width: 60, height: 6, background: C.surface, borderRadius: 3 }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: C.green, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.green, width: 28 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
