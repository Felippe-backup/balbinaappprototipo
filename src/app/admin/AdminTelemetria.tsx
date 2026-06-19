import { BarChart, Bar, FunnelChart, Funnel, LabelList, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Smartphone, Eye, Heart, ShoppingBag, Tag, BookOpen, MousePointer } from "lucide-react";
import { COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

const appEvents = [
  { evento: "Promoções visualizadas",  valor: 14820, icone: "👁️",  cor: C.blue   },
  { evento: "Produtos favoritados",    valor: 3240,  icone: "❤️",  cor: C.red    },
  { evento: "Adicionados à lista",     valor: 5680,  icone: "📋",  cor: C.green  },
  { evento: "Cupons visualizados",     valor: 8920,  icone: "🏷️",  cor: C.gold   },
  { evento: "Cupons resgatados",       valor: 2140,  icone: "✅",  cor: C.teal   },
  { evento: "Receitas acessadas",      valor: 1890,  icone: "👩‍🍳",  cor: C.purple },
  { evento: "QR Code aberto",          valor: 4320,  icone: "📱",  cor: C.orange },
];

const funnelData = [
  { name: "Abre o app",          value: 2600, fill: C.green  },
  { name: "Vê promoções",        value: 1950, fill: "#3a9a3a" },
  { name: "Acessa produto",      value: 1240, fill: C.blue   },
  { name: "Adiciona à lista",    value: 680,  fill: C.gold   },
  { name: "Usa cupom no caixa",  value: 312,  fill: C.teal   },
];

const sessionByDay = [
  { day: "Seg", sessoes: 1840, duracao: 2.4 },
  { day: "Ter", sessoes: 1920, duracao: 2.6 },
  { day: "Qua", sessoes: 2140, duracao: 2.9 },
  { day: "Qui", sessoes: 2010, duracao: 2.7 },
  { day: "Sex", sessoes: 2480, duracao: 3.1 },
  { day: "Sáb", sessoes: 2890, duracao: 3.8 },
  { day: "Dom", sessoes: 1640, duracao: 2.2 },
];

const categoryClicks = [
  { categoria: "Hortifruti",  cliques: 4820 },
  { categoria: "Carnes",      cliques: 3640 },
  { categoria: "Laticínios",  cliques: 3120 },
  { categoria: "Grãos",       cliques: 2890 },
  { categoria: "Bebidas",     cliques: 2340 },
  { categoria: "Massas",      cliques: 1820 },
  { categoria: "Limpeza",     cliques: 1240 },
  { categoria: "Mercearia",   cliques: 980  },
];

const userJourney = [
  { etapa: "Notificação recebida", usuarios: 2400, drop: 0    },
  { etapa: "Notificação aberta",   usuarios: 1560, drop: 35   },
  { etapa: "App aberto",           usuarios: 1280, drop: 18   },
  { etapa: "Promoção visualizada", usuarios: 980,  drop: 23   },
  { etapa: "Produto na lista",     usuarios: 560,  drop: 43   },
  { etapa: "Compra realizada",     usuarios: 312,  drop: 44   },
];

export function AdminTelemetria({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Telemetria" sub="Comportamento no aplicativo — sessões, eventos, funil e jornada do usuário" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Sessões/semana"   value="14.920"  sub="usuários únicos"    trend={+12} icon={Smartphone}  accent={C.green}  />
        <KpiCard label="Duração média"    value="3,1 min" sub="por sessão"         trend={+8}  icon={Eye}         accent={C.blue}   />
        <KpiCard label="Taxa ativação"    value="68%"     sub="abrem semanalmente" trend={+5}  icon={MousePointer} accent={C.gold}  />
        <KpiCard label="Conv. funil"      value="12%"     sub="notif → compra"     trend={+3}  icon={ShoppingBag} accent={C.teal}   />
      </div>

      {/* Event metrics */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Eventos — semana atual</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
          {appEvents.slice(0, isMobile ? 6 : 7).map((ev) => (
            <div key={ev.evento} style={{ background: C.surface, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: 6 }}>{ev.icone}</div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1rem", color: ev.cor, margin: "0 0 2px" }}>
                {ev.valor.toLocaleString("pt-BR")}
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: 0 }}>{ev.evento}</p>
            </div>
          ))}
        </div>
      </Card>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        {/* Sessions */}
        <Card>
          <SectionTitle>Sessões diárias — semana</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sessionByDay} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="day" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [n === "sessoes" ? v.toLocaleString("pt-BR") : `${v} min`, n === "sessoes" ? "Sessões" : "Duração méd."]} />
              <Bar dataKey="sessoes" fill={C.green} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category clicks */}
        <Card>
          <SectionTitle>Cliques por categoria</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={categoryClicks} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={C.border} />
              <XAxis type="number" tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <YAxis dataKey="categoria" type="category" tick={axisStyle()} axisLine={false} tickLine={false} width={68} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toLocaleString("pt-BR"), "Cliques"]} />
              <Bar dataKey="cliques" radius={[0, 4, 4, 0]}>
                {categoryClicks.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? C.green : i === 1 ? C.gold : i < 4 ? C.blue : C.muted} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>

      {/* Funnel */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Funil de conversão — notificação → compra</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {funnelData.map((step, i) => {
            const pct = Math.round((step.value / funnelData[0].value) * 100);
            const drop = i > 0 ? Math.round(((funnelData[i - 1].value - step.value) / funnelData[i - 1].value) * 100) : 0;
            return (
              <div key={step.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: C.muted, width: 16, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.text }}>{step.name}</span>
                    <div style={{ display: "flex", gap: 10 }}>
                      {drop > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.red }}>-{drop}%</span>}
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: C.text }}>{step.value.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                  <div style={{ height: 10, background: C.surface, borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: step.fill, borderRadius: 5, transition: "width 0.4s" }} />
                  </div>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: step.fill, width: 32, textAlign: "right", flexShrink: 0 }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* User journey */}
      <Card>
        <SectionTitle>Jornada do usuário — da notificação à compra</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 380 }}>
            <thead>
              <tr>
                {["Etapa", "Usuários", "Conversão", "Drop-off"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 10px", textAlign: h === "Etapa" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userJourney.map((step, i) => {
                const conv = Math.round((step.usuarios / userJourney[0].usuarios) * 100);
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={{ padding: "9px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? C.green : i < 3 ? C.blue : i < 5 ? C.gold : C.teal, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{step.etapa}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "9px 10px" }}>{step.usuarios.toLocaleString("pt-BR")}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.green, textAlign: "right", padding: "9px 10px" }}>{conv}%</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: step.drop > 30 ? C.red : step.drop > 0 ? C.gold : C.muted, textAlign: "right", padding: "9px 10px" }}>
                      {step.drop > 0 ? `-${step.drop}%` : "—"}
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
