import { useState } from "react";
import { Star, Award, Zap, CheckCircle, Lock, ChevronRight, Gift } from "lucide-react";

const LEVELS = [
  { name: "Bronze",   min: 0,    max: 500,   color: "#cd7f32", emoji: "🥉" },
  { name: "Prata",    min: 500,  max: 1500,  color: "#aaa",    emoji: "🥈" },
  { name: "Ouro",     min: 1500, max: 3000,  color: "#f5a623", emoji: "🥇" },
  { name: "Diamante", min: 3000, max: 9999,  color: "#7dd3fc", emoji: "💎" },
];

const USER_POINTS = 1840;
const USER_LEVEL_IDX = LEVELS.findIndex((l) => USER_POINTS >= l.min && USER_POINTS < l.max);
const level = LEVELS[USER_LEVEL_IDX] ?? LEVELS[2];
const nextLevel = LEVELS[USER_LEVEL_IDX + 1];
const progressPct = nextLevel
  ? Math.round(((USER_POINTS - level.min) / (nextLevel.min - level.min)) * 100)
  : 100;

const pointsHistory = [
  { date: "10/06", desc: "Compra de R$ 134,50",  pts: +67,  sinal: "+" },
  { date: "05/06", desc: "Compra de R$ 256,80",  pts: +128, sinal: "+" },
  { date: "05/06", desc: "Bônus categoria Grãos", pts: +25,  sinal: "+" },
  { date: "28/05", desc: "Compra de R$ 89,90",    pts: +45,  sinal: "+" },
  { date: "20/05", desc: "Resgate de cupom",       pts: -100, sinal: "-" },
  { date: "14/05", desc: "Compra de R$ 178,60",   pts: +89,  sinal: "+" },
];

const challenges = [
  { id: 1, title: "Compre 5 vezes este mês",        progress: 3, total: 5, reward: "50 pts",    done: false },
  { id: 2, title: "Compre em 3 categorias",          progress: 3, total: 3, reward: "30 pts",    done: true  },
  { id: 3, title: "Use uma promoção exclusiva",       progress: 1, total: 1, reward: "Cupom 10%",done: true  },
  { id: 4, title: "Economize R$ 100 no mês",         progress: 87, total: 100, reward: "100 pts", done: false },
];

const achievements = [
  { title: "Primeiro Login",      emoji: "🎉", desc: "Fez o primeiro acesso",                   unlocked: true  },
  { title: "Primeira Compra",     emoji: "🛒", desc: "Registrou a primeira compra",             unlocked: true  },
  { title: "Cliente Fiel",        emoji: "💚", desc: "10 compras com CPF cadastrado",           unlocked: true  },
  { title: "Economizador",        emoji: "💰", desc: "Poupou mais de R$ 500",                   unlocked: true  },
  { title: "Super Comprador",     emoji: "⭐", desc: "30+ compras no ano",                      unlocked: false },
  { title: "Mês Perfeito",        emoji: "🏆", desc: "Comprou todas as semanas do mês",         unlocked: false },
];

export function FidelidadeTab() {
  const [activeSection, setActiveSection] = useState<"overview" | "history" | "challenges" | "achievements">("overview");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 20px", background: `linear-gradient(135deg, #2d7a2d, #1e5c1e)` }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", margin: "0 0 2px" }}>Programa de Fidelidade</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: "1.6rem" }}>{level.emoji}</span>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", margin: 0 }}>Nível {level.name}</h2>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>{USER_POINTS.toLocaleString("pt-BR")} pontos</p>
          </div>
        </div>

        {nextLevel && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.7)" }}>
                {(nextLevel.min - USER_POINTS).toLocaleString("pt-BR")} pts para {nextLevel.emoji} {nextLevel.name}
              </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#fff" }}>{progressPct}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 4 }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "#fff", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
          </div>
        )}

        {/* Level pills */}
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          {LEVELS.map((l, i) => (
            <div key={l.name} style={{ flex: 1, padding: "5px 0", borderRadius: 8, textAlign: "center", background: i === USER_LEVEL_IDX ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)", border: i === USER_LEVEL_IDX ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent" }}>
              <div style={{ fontSize: "0.9rem" }}>{l.emoji}</div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.55rem", fontWeight: 700, color: i === USER_LEVEL_IDX ? "#fff" : "rgba(255,255,255,0.5)", margin: 0 }}>{l.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(45,122,45,0.12)" }}>
        {([["overview","Resumo"],["history","Pontos"],["challenges","Missões"],["achievements","Conquistas"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            style={{ flex: 1, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: activeSection === id ? 800 : 600, fontSize: "0.68rem", color: activeSection === id ? "#2d7a2d" : "#a8c8a8", borderBottom: activeSection === id ? "2px solid #2d7a2d" : "2px solid transparent" }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "16px", background: "#f7f9f4" }}>
        {/* Overview */}
        {activeSection === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Seus pontos",    value: USER_POINTS.toLocaleString("pt-BR"), sub: "acumulados",  color: "#2d7a2d", emoji: "⭐" },
                { label: "Pontos usados",  value: "100",                               sub: "em resgates", color: "#f5a623", emoji: "🎁" },
                { label: "Compras válidas",value: "38",                                sub: "no programa",  color: "#2d7a2d", emoji: "🛒" },
                { label: "Cashback ganho", value: "R$ 853",                            sub: "total",        color: "#14b8a6", emoji: "💚" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "14px 14px", border: "1px solid rgba(45,122,45,0.1)" }}>
                  <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>{s.emoji}</div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: s.color, margin: "0 0 2px" }}>{s.value}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: "#5a7a5a", margin: "0 0 1px", fontWeight: 700 }}>{s.label}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "#a8c8a8", margin: 0 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(45,122,45,0.1)" }}>
              <div style={{ padding: "12px 14px 8px" }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#1a2e1a", margin: 0 }}>✨ Benefícios {level.emoji} {level.name}</p>
              </div>
              {[
                "Acumulação de 1 ponto a cada R$ 2 gastos",
                "Acesso a cupons exclusivos",
                "Notificação antecipada de promoções",
                "Descontos em Hortifruti nas terças",
              ].map((b, i) => (
                <div key={i} style={{ padding: "9px 14px", borderTop: "1px solid rgba(45,122,45,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle size={14} style={{ color: "#2d7a2d", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#1a2e1a" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Points history */}
        {activeSection === "history" && (
          <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(45,122,45,0.1)" }}>
            <div style={{ padding: "12px 14px 8px" }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#1a2e1a", margin: 0 }}>Histórico de pontos</p>
            </div>
            {pointsHistory.map((h, i) => (
              <div key={i} style={{ padding: "11px 14px", borderTop: "1px solid rgba(45,122,45,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: h.pts > 0 ? "#edf3ec" : "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {h.pts > 0 ? <Star size={16} style={{ color: "#2d7a2d" }} /> : <Gift size={16} style={{ color: "#d4183d" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#1a2e1a", margin: 0 }}>{h.desc}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "#5a7a5a", margin: 0 }}>{h.date}</p>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.9rem", color: h.pts > 0 ? "#2d7a2d" : "#d4183d" }}>
                  {h.sinal}{Math.abs(h.pts)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Challenges */}
        {activeSection === "challenges" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#1a2e1a", margin: 0 }}>Missões de junho</p>
            {challenges.map((c) => {
              const pct = Math.min(Math.round((c.progress / c.total) * 100), 100);
              return (
                <div key={c.id} style={{ background: "#fff", borderRadius: 14, padding: "14px", border: c.done ? "1px solid rgba(45,122,45,0.3)" : "1px solid rgba(45,122,45,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: c.done ? "#5a7a5a" : "#1a2e1a", margin: 0, textDecoration: c.done ? "line-through" : "none", flex: 1, marginRight: 8 }}>{c.title}</p>
                    {c.done
                      ? <CheckCircle size={18} style={{ color: "#2d7a2d", flexShrink: 0 }} />
                      : <span style={{ padding: "2px 8px", borderRadius: 6, background: "#edf3ec", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#2d7a2d", flexShrink: 0 }}>{c.reward}</span>
                    }
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 7, background: "#edf3ec", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: c.done ? "#2d7a2d" : "#f5a623", borderRadius: 4 }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#5a7a5a", flexShrink: 0 }}>{c.progress}/{c.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Achievements */}
        {activeSection === "achievements" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#1a2e1a", margin: 0 }}>
              {achievements.filter((a) => a.unlocked).length}/{achievements.length} conquistas desbloqueadas
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "14px", border: `1px solid rgba(45,122,45,${a.unlocked ? 0.2 : 0.05})`, opacity: a.unlocked ? 1 : 0.5 }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: 6, filter: a.unlocked ? "none" : "grayscale(1)" }}>{a.emoji}</div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.78rem", color: "#1a2e1a", margin: "0 0 3px" }}>{a.title}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: "#5a7a5a", margin: 0 }}>{a.desc}</p>
                  {!a.unlocked && (
                    <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Lock size={11} style={{ color: "#a8c8a8" }} />
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "#a8c8a8" }}>Bloqueado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
