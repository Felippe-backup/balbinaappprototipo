import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Clock, TrendingDown, Zap } from "lucide-react";
import { COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

const churnBuckets = [
  { periodo: "15 dias", clientes: 89,  cor: C.gold,   risco: "Alerta" },
  { periodo: "30 dias", clientes: 134, cor: C.orange,  risco: "Moderado" },
  { periodo: "60 dias", clientes: 198, cor: "#ef4444", risco: "Alto" },
  { periodo: "90 dias", clientes: 268, cor: C.red,     risco: "Crítico" },
];

const churnTrend = [
  { mes: "Jan", churn: 48,  recuperados: 12 },
  { mes: "Fev", churn: 52,  recuperados: 18 },
  { mes: "Mar", churn: 41,  recuperados: 22 },
  { mes: "Abr", churn: 58,  recuperados: 15 },
  { mes: "Mai", churn: 44,  recuperados: 28 },
  { mes: "Jun", churn: 31,  recuperados: 19 },
];

const atRiskCustomers = [
  { nome: "Roberto Alves",       ultimaCompra: "10/03", diasSemCompra: 98, ticketMedio: 231.40, score: 18, motivo: "Ticket alto, sumiu após promoção" },
  { nome: "Juliana Nascimento",  ultimaCompra: "18/05", diasSemCompra: 60, ticketMedio: 84.20,  score: 34, motivo: "Compras ocasionais, sem engajamento no app" },
  { nome: "Lucas Mendes",        ultimaCompra: "28/05", diasSemCompra: 50, ticketMedio: 58.30,  score: 42, motivo: "Jovem, compras esporádicas" },
  { nome: "Fábio Carvalho",      ultimaCompra: "02/04", diasSemCompra: 85, ticketMedio: 178.90, score: 21, motivo: "Frequência caiu após alta anterior" },
  { nome: "Sandra Lima",         ultimaCompra: "15/04", diasSemCompra: 72, ticketMedio: 142.60, score: 28, motivo: "Padrão irregular detectado" },
  { nome: "Marcus Vinicius",     ultimaCompra: "20/05", diasSemCompra: 57, ticketMedio: 94.80,  score: 38, motivo: "Sem abertura de notificações" },
];

const campaigns = [
  { segmento: "15 dias",  acao: "Push personalizado com produto favorito em promoção",      taxa: 34 },
  { segmento: "30 dias",  acao: "Cupom surpresa de 20% válido por 7 dias",                  taxa: 28 },
  { segmento: "60 dias",  acao: "E-mail + push 'Sentimos sua falta' com cashback",           taxa: 19 },
  { segmento: "90 dias",  acao: "Campanha de reativação máxima — oferta imperdível",         taxa: 12 },
];

function RiskGauge({ score }: { score: number }) {
  const color = score < 30 ? C.red : score < 50 ? C.gold : C.green;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 40, height: 6, background: C.card, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color, fontWeight: 500 }}>{score}</span>
    </div>
  );
}

export function AdminChurn({ isMobile }: { isMobile: boolean }) {
  const totalChurnRisk = churnBuckets.reduce((s, b) => s + b.clientes, 0);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Análise de Churn" sub="Clientes em risco de abandono — score, motivos e ações automáticas" />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Em risco total"    value={String(totalChurnRisk)} sub="precisam de ação"  icon={AlertTriangle} accent={C.red}    />
        <KpiCard label="Alerta 15 dias"    value="89"                     sub="reativar urgente"  icon={Clock}         accent={C.gold}   />
        <KpiCard label="Taxa churn mês"    value="3,8%"                   sub="vs 4,2% anterior"  trend={+10}          icon={TrendingDown} accent={C.orange} />
        <KpiCard label="Recuperados/mês"   value="19"                     sub="campanha ativa"    trend={+27}          icon={Zap}         accent={C.green}  />
      </div>

      {/* Buckets */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Clientes sem compras por período</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
          {churnBuckets.map((b) => (
            <div key={b.periodo} style={{ background: C.surface, borderRadius: 12, padding: "14px 16px", borderTop: `3px solid ${b.cor}` }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>{b.periodo}</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1.4rem", color: b.cor, margin: "0 0 4px" }}>{b.clientes}</p>
              <span style={{ padding: "2px 8px", borderRadius: 5, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", background: `${b.cor}22`, color: b.cor }}>{b.risco}</span>
            </div>
          ))}
        </div>
      </Card>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Churn vs. Recuperados — 2024</SectionTitle>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={churnTrend} barGap={4} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
              <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [v, n === "churn" ? "Churned" : "Recuperados"]} />
              <Bar dataKey="churn"       fill={C.red}   radius={[4, 4, 0, 0]} />
              <Bar dataKey="recuperados" fill={C.green}  radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[["Churned", C.red], ["Recuperados", C.green]].map(([l, c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c as string }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Ações sugeridas por janela</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {campaigns.map((camp, i) => (
              <div key={i} style={{ background: C.surface, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: churnBuckets[i].cor }}>{camp.segmento}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.green }}>~{camp.taxa}% conv.</span>
                </div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: C.muted, margin: 0, lineHeight: 1.4 }}>{camp.acao}</p>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* At-risk customers */}
      <Card>
        <SectionTitle>Clientes em maior risco — score individual</SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 440 }}>
            <thead>
              <tr>
                {["Cliente", "Últ. compra", "Dias", "Ticket", "Score", "Motivo provável"].map((h) => (
                  <th key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, padding: "4px 10px", textAlign: h === "Cliente" || h === "Motivo provável" ? "left" : "right", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {atRiskCustomers.map((c, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text, padding: "10px 10px", whiteSpace: "nowrap" }}>{c.nome}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.muted, textAlign: "right", padding: "10px 10px" }}>{c.ultimaCompra}</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: c.diasSemCompra > 80 ? C.red : C.gold, textAlign: "right", padding: "10px 10px", fontWeight: 500 }}>{c.diasSemCompra}d</td>
                  <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: C.text, textAlign: "right", padding: "10px 10px" }}>R$ {c.ticketMedio.toFixed(0)}</td>
                  <td style={{ padding: "10px 10px" }}>
                    <RiskGauge score={c.score} />
                  </td>
                  <td style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.73rem", color: C.muted, padding: "10px 10px" }}>{c.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, marginTop: 10 }}>
          * Score de risco: 0–30 = crítico (vermelho), 31–50 = moderado (amarelo), 51+ = baixo (verde)
        </p>
      </Card>
    </div>
  );
}
