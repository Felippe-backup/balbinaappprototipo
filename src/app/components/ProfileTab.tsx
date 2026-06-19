import { User, CreditCard, Bell, Gift, ChevronRight, LogOut, Star } from "lucide-react";

interface ProfileTabProps {
  userName: string;
  cpf: string;
  onLogout: () => void;
}

function formatCPF(cpf: string): string {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

const notifications = [
  { id: 1, text: "Nova oferta: Frango a R$ 14,99/kg", time: "há 2h", read: false },
  { id: 2, text: "Você economizou R$ 87,00 este mês!", time: "ontem", read: false },
  { id: 3, text: "Ofertas de fim de semana disponíveis", time: "há 2 dias", read: true },
];

export function ProfileTab({ userName, cpf, onLogout }: ProfileTabProps) {
  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20" style={{ scrollbarWidth: "none", maxWidth: "100%", overflowX: "hidden" }}>
      {/* Header with avatar */}
      <div className="pt-6 pb-8 flex flex-col items-center" style={{ background: "linear-gradient(160deg, #2d7a2d, #3d9a3d)", paddingX: "16px" }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white mb-3 shadow-lg"
          style={{ background: "rgba(255,255,255,0.25)", fontSize: "1.5rem", fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
        >
          {initials}
        </div>
        <h2 className="text-white text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem" }}>
          {userName}
        </h2>
        <div className="mt-2 flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
          <CreditCard size={12} className="text-white/80" />
          <span className="text-white/90 text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            CPF: {formatCPF(cpf)}
          </span>
        </div>

        {/* Loyalty level */}
        <div className="mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2.5">
          <Star size={16} fill="#f5a623" stroke="#f5a623" />
          <div>
            <p className="text-white text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>
              Cliente Ouro
            </p>
            <p className="text-white/70 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Cliente desde Jan/2024
            </p>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: "16px", paddingRight: "16px", marginTop: "-16px", display: "flex", flexDirection: "column", gap: "16px", overflowX: "hidden" }}>
        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-3 gap-3" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <div className="text-center">
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#2d7a2d" }}>23</p>
            <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>compras</p>
          </div>
          <div className="text-center" style={{ borderLeft: "1px solid rgba(45,122,45,0.1)", borderRight: "1px solid rgba(45,122,45,0.1)" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#f5a623" }}>R$853</p>
            <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>poupados</p>
          </div>
          <div className="text-center">
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#2d7a2d" }}>6</p>
            <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>meses</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)", overflowX: "hidden" }}>
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={16} style={{ color: "#2d7a2d" }} />
              <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
                Notificações
              </p>
            </div>
            {unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#f5a623" }}>
                <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: "#1a2e1a" }}>
                  {unread}
                </span>
              </div>
            )}
          </div>
          {notifications.map((n, i) => (
            <div
              key={n.id}
              className="px-4 py-3 flex items-start gap-3"
              style={{
                borderTop: "1px solid rgba(45,122,45,0.08)",
                background: n.read ? "transparent" : "rgba(245,166,35,0.05)",
                overflow: "hidden",
              }}
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: n.read ? "transparent" : "#f5a623" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: n.read ? 400 : 700, color: "#1a2e1a", wordBreak: "break-word" }}>
                  {n.text}
                </p>
                <p className="text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                  {n.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)", overflowX: "hidden" }}>
          <div className="px-4 pt-4 pb-3 flex items-center gap-2">
            <Gift size={16} style={{ color: "#2d7a2d" }} />
            <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
              Benefícios do programa
            </p>
          </div>
          {[
            { title: "Preços exclusivos para cadastrados", icon: "🏷️" },
            { title: "Avisos antecipados de promoções", icon: "🔔" },
            { title: "Histórico completo de compras", icon: "📊" },
            { title: "Receitas com produtos em oferta", icon: "👩‍🍳" },
          ].map((benefit, i) => (
            <div
              key={i}
              className="px-4 py-3 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(45,122,45,0.08)", overflow: "hidden" }}
            >
              <span className="text-lg flex-shrink-0">{benefit.icon}</span>
              <p className="text-sm flex-1" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: "#1a2e1a", wordBreak: "break-word" }}>
                {benefit.title}
              </p>
              <ChevronRight size={16} style={{ color: "#a8c8a8", flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
          style={{ border: "1.5px solid rgba(212,24,61,0.3)", color: "#d4183d", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
