import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { AlertTriangle, Package, RefreshCw, Trash2 } from "lucide-react";
import { stockAlerts, stockTurnover, wasteEstimate, expiryRisk, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Grid, Card, tooltipStyle, axisStyle } from "./shared";

const C = COLORS;

const statusCfg: Record<string, { color: string; label: string }> = {
  "crítico": { color: C.red,  label: "Crítico" },
  "baixo":   { color: C.gold, label: "Baixo"   },
  "ok":      { color: C.green,label: "OK"       },
};

export function AdminEstoque({ isMobile }: { isMobile: boolean }) {
  const critical = stockAlerts.filter((s) => s.status === "crítico").length;
  const low      = stockAlerts.filter((s) => s.status === "baixo").length;
  const avgWaste = wasteEstimate.slice(-3).reduce((s, w) => s + w.pct, 0) / 3;
  const slowMovers = stockTurnover.filter((s) => s.giro < s.meta).length;

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      <PageHeader title="Estoque" sub="Alertas de ruptura, giro, desperdício e validade" />

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Alertas críticos"   value={String(critical)}         sub="ruptura iminente"       icon={AlertTriangle} accent={C.red}    />
        <KpiCard label="Estoque baixo"       value={String(low)}              sub="abaixo do mínimo"       icon={Package}       accent={C.gold}   />
        <KpiCard label="Desperdício médio"   value={`${avgWaste.toFixed(1)}%`} sub="últimos 3 meses"      icon={Trash2}        accent={C.orange} />
        <KpiCard label="Giro abaixo da meta" value={String(slowMovers)}       sub="categorias lentas"     icon={RefreshCw}     accent={C.purple} />
      </div>

      {/* Stock alerts + expiry */}
      <Grid cols={2} gap={16} isMobile={isMobile}>
        <Card>
          <SectionTitle>Alertas de reposição urgente</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stockAlerts.map((item, i) => {
              const cfg = statusCfg[item.status];
              const pct = Math.round((item.estoque / item.minimo) * 100);
              return (
                <div key={i} style={{ background: C.surface, borderRadius: 10, padding: "10px 12px", borderLeft: `3px solid ${cfg.color}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.text, margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.produto}
                      </p>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: 0 }}>
                        {item.categoria} · {item.diasRestantes}d restantes
                      </p>
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 6, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", background: `${cfg.color}22`, color: cfg.color, flexShrink: 0 }}>
                      {cfg.label}
                    </span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: cfg.color }}>{item.estoque} un.</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: C.muted }}>mín: {item.minimo}</span>
                    </div>
                    <div style={{ height: 5, background: C.card, borderRadius: 3 }}>
                      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: cfg.color, borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle>Risco de vencimento próximo</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 10px", padding: "4px 10px" }}>
              {["Produto", "Validade", "Qtd"].map((h) => (
                <span key={h} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: h !== "Produto" ? "right" : "left" }}>{h}</span>
              ))}
            </div>
            {expiryRisk.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 10px", padding: "9px 10px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text, margin: 0 }}>{item.produto}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: C.muted, margin: 0 }}>{item.categoria} · {item.lote}</p>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.red, textAlign: "right" }}>{item.validade}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: C.text, textAlign: "right" }}>{item.quantidade}</span>
              </div>
            ))}
            <div style={{ padding: "10px 10px", borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: C.gold, margin: 0 }}>
                💡 Considere promoções rápidas para itens com validade ≤ 3 dias para minimizar perdas.
              </p>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Turnover chart */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Giro de estoque por categoria — meta vs. realizado</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stockTurnover} barGap={4} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
            <XAxis dataKey="categoria" tick={axisStyle()} axisLine={false} tickLine={false} angle={isMobile ? -30 : 0} textAnchor={isMobile ? "end" : "middle"} height={isMobile ? 40 : 20} />
            <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`${v}x / mês`, n === "giro" ? "Giro atual" : "Meta"]} />
            <Bar dataKey="giro" radius={[4, 4, 0, 0]} name="giro">
              {stockTurnover.map((entry, i) => (
                <Cell key={i} fill={entry.giro >= entry.meta ? C.green : C.red} />
              ))}
            </Bar>
            <Bar dataKey="meta" fill={`${C.muted}44`} radius={[4, 4, 0, 0]} name="meta" />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
          {[["Atingiu meta", C.green], ["Abaixo da meta", C.red], ["Meta", `${C.muted}88`]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c as string }} />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted }}>{l}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Waste trend */}
      <Card>
        <SectionTitle>Tendência de desperdício — 2024</SectionTitle>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={wasteEstimate}>
            <defs>
              <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.orange} stopOpacity={0.2} />
                <stop offset="95%" stopColor={C.orange} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.border} />
            <XAxis dataKey="mes" tick={axisStyle()} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle(true)} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 4]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [n === "pct" ? `${v}%` : `R$ ${v.toLocaleString("pt-BR")}`, n === "pct" ? "% do faturamento" : "Valor perdido"]} />
            <Area type="monotone" dataKey="pct" stroke={C.orange} strokeWidth={2} fill="url(#wasteGrad)" dot={{ fill: C.orange, r: 3, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 10, marginTop: 12 }}>
          {wasteEstimate.slice(-3).map((w) => (
            <div key={w.mes} style={{ background: C.surface, borderRadius: 10, padding: "10px 12px" }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: C.muted, margin: "0 0 4px" }}>{w.mes}</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1rem", color: C.orange, margin: 0 }}>{w.pct}%</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: "2px 0 0" }}>R$ {w.desperdicio.toLocaleString("pt-BR")}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
