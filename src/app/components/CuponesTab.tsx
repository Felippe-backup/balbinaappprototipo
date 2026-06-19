import { useState } from "react";
import { Tag, CheckCircle, Clock, Percent } from "lucide-react";

type CouponStatus = "disponivel" | "utilizado" | "expirado";

const coupons: { id: number; codigo: string; desc: string; categoria: string; desconto: string; economia: number; validade: string; status: CouponStatus; personalizado: boolean }[] = [
  { id: 1, codigo: "FIEL15",    desc: "15% off em Grãos",          categoria: "Grãos",       desconto: "15%", economia: 5.22,  validade: "20/06", status: "disponivel",  personalizado: true  },
  { id: 2, codigo: "HORTA20",   desc: "20% off em Hortifruti",      categoria: "Hortifruti",  desconto: "20%", economia: 8.40,  validade: "18/06", status: "disponivel",  personalizado: true  },
  { id: 3, codigo: "CAFE10",    desc: "R$ 5 off no Café Pilão",     categoria: "Bebidas",     desconto: "R$5", economia: 5.00,  validade: "30/06", status: "disponivel",  personalizado: false },
  { id: 4, codigo: "LACT12",    desc: "12% off em Laticínios",      categoria: "Laticínios",  desconto: "12%", economia: 4.10,  validade: "16/06", status: "disponivel",  personalizado: true  },
  { id: 5, codigo: "BOAS10",    desc: "10% off primeira compra",    categoria: "Geral",       desconto: "10%", economia: 13.45, validade: "01/06", status: "utilizado",   personalizado: false },
  { id: 6, codigo: "LIMPEZA8",  desc: "8% off em Limpeza",          categoria: "Limpeza",     desconto: "8%",  economia: 2.80,  validade: "05/06", status: "expirado",    personalizado: false },
  { id: 7, codigo: "CARNE18",   desc: "18% off em Carnes",          categoria: "Carnes",      desconto: "18%", economia: 12.30, validade: "04/06", status: "expirado",    personalizado: true  },
];

const statusConfig = {
  disponivel:  { label: "Disponível",  color: "#2d7a2d", bg: "#edf3ec" },
  utilizado:   { label: "Utilizado",   color: "#5a7a5a", bg: "#f3f4f6" },
  expirado:    { label: "Expirado",    color: "#d4183d", bg: "#fff0f0" },
};

const catEmoji: Record<string, string> = {
  Grãos: "🌾", Hortifruti: "🥦", Bebidas: "☕", Laticínios: "🥛",
  Geral: "🛒", Limpeza: "🧴", Carnes: "🥩",
};

export function CuponesTab() {
  const [activeTab, setActiveTab] = useState<CouponStatus>("disponivel");
  const shown = coupons.filter((c) => c.status === activeTab);
  const totalEconomiaPotencial = coupons.filter((c) => c.status === "disponivel").reduce((s, c) => s + c.economia, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 18px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", margin: "0 0 2px" }}>Central de Cupons</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", margin: "0 0 10px" }}>Suas ofertas exclusivas</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", margin: "0 0 2px" }}>Cupons disponíveis</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0 }}>{coupons.filter((c) => c.status === "disponivel").length}</p>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.65)", margin: "0 0 2px" }}>Economia potencial</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0 }}>R$ {totalEconomiaPotencial.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>
      </div>

      {/* Status tabs */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(45,122,45,0.12)" }}>
        {(["disponivel", "utilizado", "expirado"] as const).map((tab) => {
          const count = coupons.filter((c) => c.status === tab).length;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "10px 0", border: "none", background: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: activeTab === tab ? 800 : 600, fontSize: "0.68rem", color: activeTab === tab ? statusConfig[tab].color : "#a8c8a8", borderBottom: `2px solid ${activeTab === tab ? statusConfig[tab].color : "transparent"}` }}>
              {tab === "disponivel" ? "Disponíveis" : tab === "utilizado" ? "Utilizados" : "Expirados"} ({count})
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, padding: "14px 16px", background: "#f7f9f4", display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: "2.5rem", marginBottom: 8 }}>🎟️</p>
            <p style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a", fontSize: "0.85rem" }}>Nenhum cupom aqui</p>
          </div>
        )}

        {shown.map((coupon) => {
          const cfg = statusConfig[coupon.status];
          const isAvailable = coupon.status === "disponivel";
          return (
            <div
              key={coupon.id}
              style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: `1px solid ${isAvailable ? "rgba(45,122,45,0.15)" : "rgba(0,0,0,0.06)"}`, opacity: isAvailable ? 1 : 0.65 }}
            >
              {/* Dashed divider illusion */}
              <div style={{ display: "flex", alignItems: "stretch" }}>
                {/* Left accent */}
                <div style={{ width: 6, background: isAvailable ? "#2d7a2d" : "#ccc", flexShrink: 0 }} />

                {/* Content */}
                <div style={{ flex: 1, padding: "14px 14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: isAvailable ? "#edf3ec" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                      {catEmoji[coupon.categoria] ?? "🏷️"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.88rem", color: "#1a2e1a", margin: "0 0 2px" }}>{coupon.desc}</p>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "#5a7a5a", margin: 0 }}>{coupon.categoria}</p>
                    </div>
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      <div style={{ padding: "4px 10px", borderRadius: 8, background: isAvailable ? "#edf3ec" : "#f3f4f6", marginBottom: 4 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "1rem", color: isAvailable ? "#2d7a2d" : "#5a7a5a" }}>{coupon.desconto}</span>
                      </div>
                      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: isAvailable ? "#2d7a2d" : "#5a7a5a", margin: 0, fontWeight: 700 }}>
                        Economia: R$ {coupon.economia.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", items: "center", gap: 6 }}>
                      <span style={{ padding: "2px 8px", borderRadius: 5, background: cfg.bg, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", color: cfg.color }}>
                        {cfg.label}
                      </span>
                      {coupon.personalizado && (
                        <span style={{ padding: "2px 8px", borderRadius: 5, background: "#fff0f5", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.62rem", color: "#db2777" }}>
                          Para você ✨
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} style={{ color: "#5a7a5a" }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#5a7a5a" }}>{coupon.validade}</span>
                    </div>
                  </div>

                  {isAvailable && (
                    <div style={{ marginTop: 10, padding: "8px 12px", background: "#f7f9f4", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#2d7a2d", letterSpacing: "0.1em" }}>{coupon.codigo}</span>
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: "#5a7a5a" }}>Informe no caixa</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
