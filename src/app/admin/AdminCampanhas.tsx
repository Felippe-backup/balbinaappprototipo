import { useState } from "react";
import { Megaphone, Target, Users, TrendingUp, CheckCircle, Clock, XCircle, Plus, X } from "lucide-react";
import { campaigns, customerSegments, ageDistribution, COLORS } from "./adminData";
import { SectionTitle, KpiCard, PageHeader, Card } from "./shared";

const C = COLORS;

const statusCfg: Record<string, { label: string; color: string; Icon: React.ElementType }> = {
  ativa:     { label: "Ativa",      color: C.green, Icon: CheckCircle },
  rascunho:  { label: "Rascunho",   color: C.gold,  Icon: Clock       },
  encerrada: { label: "Encerrada",  color: C.muted, Icon: XCircle     },
};
const segColors: Record<string, string> = { Fiel: C.green, Frequente: C.blue, Ocasional: C.gold, Inativo: C.red };

function AudienceBuilder({ onClose }: { onClose: () => void }) {
  const [selectedSegs, setSelectedSegs] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [campaignName, setCampaignName] = useState("");
  const [discount, setDiscount] = useState("");

  const toggleSeg = (s: string) => setSelectedSegs((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleAge = (a: string) => setSelectedAges((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);

  const totalBase = customerSegments.filter((s) => selectedSegs.length === 0 || selectedSegs.includes(s.segment)).reduce((s, seg) => s + seg.count, 0);
  const ageFactor = selectedAges.length === 0 ? 1 : ageDistribution.filter((a) => selectedAges.includes(a.faixa)).reduce((s, a) => s + a.pct, 0) / 100;
  const reach = Math.round(totalBase * ageFactor);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: C.text, margin: 0 }}>Nova Campanha</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: C.muted, marginTop: 2 }}>Construtor de audiência avançado</p>
          </div>
          <button onClick={onClose} style={{ background: C.surface, border: "none", borderRadius: 8, padding: 7, cursor: "pointer" }}>
            <X size={16} style={{ color: C.muted }} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Nome da campanha</label>
            <input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Ex: Outubro Rosa — Hortifruti" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, padding: "9px 12px", fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", color: C.text, outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Segmentos</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {customerSegments.map((s) => (
                  <button key={s.segment} onClick={() => toggleSeg(s.segment)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 9, cursor: "pointer", border: `1px solid ${selectedSegs.includes(s.segment) ? s.color : C.border}`, background: selectedSegs.includes(s.segment) ? `${s.color}18` : C.surface }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{s.segment}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.muted }}>{s.count}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Faixas etárias</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {ageDistribution.map((a) => (
                  <button key={a.faixa} onClick={() => toggleAge(a.faixa)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 9, cursor: "pointer", border: `1px solid ${selectedAges.includes(a.faixa) ? C.teal : C.border}`, background: selectedAges.includes(a.faixa) ? `${C.teal}18` : C.surface }}>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: C.text }}>{a.faixa} anos</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.muted }}>{a.pct}%</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Desconto / benefício</label>
            <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Ex: 15% em Grãos e Laticínios" style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, padding: "9px 12px", fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", color: C.text, outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ padding: "14px 18px", background: `${C.green}18`, border: `1px solid ${C.green}44`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem", color: C.muted, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Alcance estimado</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "1.3rem", color: C.green, margin: 0 }}>{reach.toLocaleString("pt-BR")} clientes</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: 0 }}>{selectedSegs.length ? selectedSegs.join(", ") : "Todos os segmentos"}</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: C.muted, margin: "2px 0 0" }}>{selectedAges.length ? selectedAges.join(", ") : "Todas as faixas"}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 9, border: `1px solid ${C.border}`, background: "transparent", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.muted, cursor: "pointer" }}>Cancelar</button>
            <button onClick={onClose} style={{ flex: 2, padding: "11px", borderRadius: 9, border: "none", background: C.green, fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#fff", cursor: "pointer" }}>Salvar campanha</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminCampanhas({ isMobile }: { isMobile: boolean }) {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div style={{ padding: isMobile ? "16px 14px" : "24px 28px", overflowY: "auto", height: "100%", scrollbarWidth: "none" }}>
      {showBuilder && <AudienceBuilder onClose={() => setShowBuilder(false)} />}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, gap: 12, flexWrap: "wrap" }}>
        <PageHeader title="Campanhas" sub="Segmentação por comportamento, ticket e frequência" />
        <button onClick={() => setShowBuilder(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 9, border: "none", background: C.green, fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#fff", cursor: "pointer", flexShrink: 0 }}>
          <Plus size={15} /> Nova campanha
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Campanhas ativas" value="2"    sub="em andamento"   icon={CheckCircle} accent={C.green} />
        <KpiCard label="Rascunhos"        value="1"    sub="aguardando"      icon={Clock}       accent={C.gold}  />
        <KpiCard label="Alcance total"    value="754"  sub="clientes únicos" icon={Target}      accent={C.blue}  />
        <KpiCard label="Conv. média"      value="30%"  sub="ativas"  trend={+4} icon={TrendingUp}  accent={C.teal}  />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {campaigns.map((camp) => {
          const { label, color, Icon } = statusCfg[camp.status];
          return (
            <Card key={camp.id}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${C.green}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Megaphone size={16} style={{ color: C.green }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: C.text, margin: 0 }}>{camp.nome}</h3>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.73rem", color: C.muted, margin: "2px 0 0" }}>{camp.inicio} – {camp.fim} · {camp.desconto}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 7, background: `${color}18`, border: `1px solid ${color}44`, flexShrink: 0 }}>
                  <Icon size={11} style={{ color }} />
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color }}>{label}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                {camp.segmentos.map((s) => (
                  <span key={s} style={{ padding: "2px 7px", borderRadius: 5, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.65rem", background: `${segColors[s] || C.muted}22`, color: segColors[s] || C.muted }}>{s}</span>
                ))}
                {camp.faixas.map((f) => (
                  <span key={f} style={{ padding: "2px 7px", borderRadius: 5, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.65rem", background: `${C.teal}22`, color: C.teal }}>{f}</span>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: camp.conversao > 0 ? 12 : 0 }}>
                {[
                  { label: "Alcance",    value: camp.alcance.toLocaleString("pt-BR"), color: C.text  },
                  { label: "Abertura",   value: `${camp.abertura}%`,                  color: camp.abertura > 50 ? C.green : camp.abertura > 0 ? C.gold : C.muted },
                  { label: "Conversão",  value: `${camp.conversao}%`,                 color: camp.conversao > 30 ? C.green : camp.conversao > 0 ? C.gold : C.muted },
                ].map((m) => (
                  <div key={m.label} style={{ background: C.surface, borderRadius: 9, padding: "10px 12px" }}>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 3px" }}>{m.label}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: "0.95rem", color: m.color, margin: 0 }}>{m.value}</p>
                  </div>
                ))}
              </div>

              {camp.conversao > 0 && (
                <div>
                  <div style={{ height: 5, background: C.surface, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${camp.conversao}%`, height: "100%", background: C.green, borderRadius: 3 }} />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
