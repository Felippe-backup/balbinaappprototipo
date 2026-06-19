import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar } from "recharts";
import { COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";
import { Target, Star, TrendingUp, AlertTriangle, UserX } from "lucide-react";

const C = COLORS;

const rfmSegments = [
  { id: "campeoes",      label: "Campeões",        count: 312, color: "#22c55e", icon: Star,         r: 5, f: 5, m: 5, desc: "Compram frequentemente, alto valor, recentes" },
  { id: "fieis",         label: "Fiéis",           count: 486, color: C.green,  icon: TrendingUp,   r: 4, f: 4, m: 4, desc: "Compras regulares, bom valor, engajados" },
  { id: "potenciais",    label: "Potenciais Fiéis", count: 398, color: C.blue,  icon: Target,       r: 4, f: 2, m: 3, desc: "Recentes, mas ainda pouco frequentes" },
  { id: "em_risco",      label: "Em Risco",        count: 287, color: C.gold,  icon: AlertTriangle, r: 2, f: 3, m: 4, desc: "Bom histórico mas sumindo; reativar urgente" },
  { id: "perdidos",      label: "Perdidos",        count: 268, color: C.red,   icon: UserX,        r: 1, f: 1, m: 2, desc: "Não compram há muito tempo, baixo engajamento" },
];

// Scatter data: x=recência(inverso), y=frequência, z=valor
const scatterData = [
  { x: 9, y: 9, z: 800, seg: "campeoes",   nome: "Maria A." },
  { x: 9, y: 8, z: 750, seg: "campeoes",   nome: "Ana Lima" },
  { x: 8, y: 8, z: 600, seg: "fieis",      nome: "Antônio B." },
  { x: 8, y: 7, z: 550, seg: "fieis",      nome: "Fernanda C." },
  { x: 7, y: 8, z: 500, seg: "fieis",      nome: "Pedro H." },
  { x: 9, y: 4, z: 300, seg: "potenciais", nome: "Mariana P." },
  { x: 8, y: 3, z: 280, seg: "potenciais", nome: "João C." },
  { x: 3, y: 7, z: 520, seg: "em_risco",   nome: "Claudia R." },
  { x: 2, y: 6, z: 480, seg: "em_risco",   nome: "Carlos E." },
  { x: 1, y: 2, z: 180, seg: "perdidos",   nome: "Roberto A." },
  { x: 2, y: 1, z: 120, seg: "perdidos",   nome: "Lucas M." },
  { x: 9, y: 5, z: 310, seg: "potenciais", nome: "Juliana N." },
  { x: 4, y: 5, z: 420, seg: "em_risco",   nome: "Rodrigo S." },
];

const rfmActions: Record<string, string[]> = {
  campeoes:   ["Programa VIP exclusivo", "Cashback progressivo", "Acesso antecipado a promoções"],
  fieis:      ["Desafios de frequência", "Cupons de categoria favorita", "Fidelidade premium"],
  potenciais: ["Sequência de ofertas semanais", "Missão 'sua segunda compra'", "Notificação de chegada de produtos"],
  em_risco:   ["Campanha de reativação urgente", "Cupom de alto desconto", "Notificação personalizada"],
  perdidos:   ["E-mail de saudade", "Oferta 'sentimos sua falta'", "Pesquisa de motivo"],
};

const segColorMap: Record<string, string> = {
  campeoes: "#22c55e", fieis: C.green, potenciais: C.blue, em_risco: C.gold, perdidos: C.red,
};

export function AdminRFM({ isMobile }: { isMobile: boolean }) {
  const total = rfmSegments.reduce((s, r) => s + r.count, 0);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Análise RFM" sub="Recência · Frequência · Valor Monetário — segmentação comportamental" />

      {/* Segment cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 10, marginBottom: 20 }}>
        {rfmSegments.map((seg) => {
          const Icon = seg.icon;
          return (
            <div key={seg.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 14px 12px", borderTop: `3px solid ${seg.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <Icon size={14} style={{ color: seg.color }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: C.muted }}>{Math.round((seg.count / total) * 100)}%</span>
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.8rem", color: C.text, margin: "0 0 2px" }}>{seg.label}</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1.05rem", color: seg.color, margin: "0 0 4px" }}>{seg.count}</p>
              <div style={{ display: "flex", gap: 4 }}>
                {[["R", seg.r], ["F", seg.f], ["M", seg.m]].map(([ltr, val]) => (
                  <div key={ltr} style={{ flex: 1, background: C.surface, borderRadius: 5, padding: "3px 0", textAlign: "center" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: C.muted, margin: 0 }}>{ltr}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: seg.color, margin: 0, fontWeight: 500 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Grid cols={2} gap={16} isMobile={isMobile}>
        {/* Scatter plot */}
        <Card>
          <SectionTitle>Mapa RFM — Recência × Frequência × Valor</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="x" name="Recência" type="number" domain={[0, 10]} tick={axisStyle(true)} axisLine={false} tickLine={false} label={{ value: "Recência →", position: "insideBottom", offset: -4, style: { fontFamily: "'Nunito'", fontSize: "0.62rem", fill: C.muted } }} />
              <YAxis dataKey="y" name="Frequência" type="number" domain={[0, 10]} tick={axisStyle(true)} axisLine={false} tickLine={false} label={{ value: "Freq. →", angle: -90, position: "insideLeft", style: { fontFamily: "'Nunito'", fontSize: "0.62rem", fill: C.muted } }} />
              <Tooltip
                contentStyle={tooltipStyle}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ ...tooltipStyle, padding: "8px 12px" }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: segColorMap[d.seg], margin: "0 0 4px" }}>{rfmSegments.find((s) => s.id === d.seg)?.label}</p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, margin: 0 }}>{d.nome}</p>
                    </div>
                  );
                }}
              />
              <Scatter data={scatterData} shape={(props: Record<string, number>) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: typeof scatterData[0] };
                const r = 6 + (payload.z / 800) * 8;
                return <circle cx={cx} cy={cy} r={r} fill={segColorMap[payload.seg]} fillOpacity={0.75} stroke={segColorMap[payload.seg]} strokeWidth={1} />;
              }} />
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            {rfmSegments.map((s) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: C.muted }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <SectionTitle>Recomendações automáticas de ação</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rfmSegments.map((seg) => (
              <div key={seg.id} style={{ background: C.surface, borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${seg.color}` }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: C.text, margin: "0 0 6px" }}>
                  {seg.label} <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: "0.72rem", color: C.muted }}>({seg.count})</span>
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {rfmActions[seg.id].map((action, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: seg.color, marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: C.muted, lineHeight: 1.4 }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* RFM score bar */}
      <Card>
        <SectionTitle>Distribuição de clientes por segmento RFM</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rfmSegments.map((seg) => {
            const pct = (seg.count / total) * 100;
            return (
              <div key={seg.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.text, width: isMobile ? 90 : 130, flexShrink: 0 }}>{seg.label}</span>
                <div style={{ flex: 1, height: 10, background: C.surface, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: seg.color, borderRadius: 5, transition: "width 0.4s" }} />
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: seg.color, width: 36, textAlign: "right", flexShrink: 0 }}>{seg.count}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.muted, width: 30, textAlign: "right", flexShrink: 0 }}>{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, marginTop: 14 }}>
          💡 Campeões e Fiéis representam {Math.round(((312 + 486) / total) * 100)}% da base e geram estimadamente 68% da receita total. Priorize retenção desse grupo.
        </p>
      </Card>
    </div>
  );
}
