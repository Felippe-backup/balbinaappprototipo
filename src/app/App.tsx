import { useState, useEffect } from "react";
import { Tag, TrendingDown, Star, Wallet, Ticket, QrCode, User } from "lucide-react";
import { LoginScreen } from "./components/LoginScreen";
import { PromotionsTab } from "./components/PromotionsTab";
import { SavingsTab } from "./components/SavingsTab";
import { ProfileTab } from "./components/ProfileTab";
import { FidelidadeTab } from "./components/FidelidadeTab";
import { CashbackTab } from "./components/CashbackTab";
import { CuponesTab } from "./components/CuponesTab";
import { QRCodeTab } from "./components/QRCodeTab";
import { Logo } from "./components/Logo";
import { AdminApp } from "./admin/AdminApp";

type Tab = "promotions" | "fidelidade" | "cashback" | "cupons" | "qrcode" | "savings" | "profile";

interface UserData { cpf: string; name: string; }

// Primary nav (bottom bar) — 5 tabs max for usability
const PRIMARY_TABS = [
  { id: "promotions" as Tab, label: "Ofertas",    Icon: Tag      },
  { id: "fidelidade" as Tab, label: "Fidelidade", Icon: Star     },
  { id: "cupons"     as Tab, label: "Cupons",     Icon: Ticket   },
  { id: "savings"    as Tab, label: "Economias",  Icon: TrendingDown },
  { id: "profile"    as Tab, label: "Perfil",     Icon: User     },
];

// Secondary tabs accessible from their parent screens or by swipe — exposed as quick cards
export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("promotions");
  // Cashback & QR accessible from sub-sections; also allow direct nav from profile
  const [subView, setSubView] = useState<"cashback" | "qrcode" | null>(null);

  useEffect(() => {
    const savedCpf = localStorage.getItem("balbina_active_cpf");
    const savedAdmin = localStorage.getItem("balbina_is_admin");
    if (savedAdmin === "true") {
      setIsAdmin(true);
    } else if (savedCpf) {
      const savedName = localStorage.getItem(`balbina_name_${savedCpf}`) || "Cliente";
      setUser({ cpf: savedCpf, name: savedName });
    }
  }, []);

  const handleLogin = (cpf: string, name: string) => {
    localStorage.setItem("balbina_active_cpf", cpf);
    setUser({ cpf, name });
  };

  const handleAdminLogin = () => {
    localStorage.setItem("balbina_is_admin", "true");
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("balbina_active_cpf");
    localStorage.removeItem("balbina_is_admin");
    setUser(null);
    setIsAdmin(false);
    setActiveTab("promotions");
    setSubView(null);
  };

  if (isAdmin) return <AdminApp onLogout={handleLogout} />;
  if (!user)  return <LoginScreen onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;

  const initials = user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  // Sub-view overlay
  if (subView === "cashback") {
    return (
      <div style={{ minHeight: "100dvh", maxWidth: 430, margin: "0 auto", background: "#f7f9f4", display: "flex", flexDirection: "column" }}>
        <header style={{ background: "#14b8a6", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSubView(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem" }}>← Voltar</button>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>Cashback</span>
        </header>
        <div style={{ flex: 1, overflow: "hidden" }}><CashbackTab /></div>
      </div>
    );
  }

  if (subView === "qrcode") {
    return (
      <div style={{ minHeight: "100dvh", maxWidth: 430, margin: "0 auto", background: "#f7f9f4", display: "flex", flexDirection: "column" }}>
        <header style={{ background: "#2d7a2d", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSubView(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem" }}>← Voltar</button>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>Cartão Digital</span>
        </header>
        <div style={{ flex: 1, overflow: "hidden" }}><QRCodeTab userName={user.name} cpf={user.cpf} /></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", maxWidth: 430, margin: "0 auto", background: "#f7f9f4", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Top bar */}
      <header style={{ background: "#2d7a2d", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={34} />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem" }}>dona</span>
              <span style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1rem" }}>Balbina</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontSize: "0.6rem", margin: 0, lineHeight: 1 }}>Desde 1960</p>
          </div>
        </div>
        {/* Quick access buttons */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => setSubView("cashback")} title="Cashback" style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <Wallet size={14} style={{ color: "#fff" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#fff" }}>R$24</span>
          </button>
          <button onClick={() => setSubView("qrcode")} title="QR Code" style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer" }}>
            <QrCode size={16} style={{ color: "#fff" }} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 10px" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.58rem" }}>{initials}</div>
            <span style={{ color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem" }}>{user.name.split(" ")[0]}</span>
          </div>
        </div>
      </header>

      {/* Tab content */}
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {activeTab === "promotions" && <PromotionsTab />}
        {activeTab === "fidelidade" && <FidelidadeTab />}
        {activeTab === "cupons"     && <CuponesTab />}
        {activeTab === "savings"    && <SavingsTab userName={user.name} cpf={user.cpf} />}
        {activeTab === "profile"    && <ProfileTab userName={user.name} cpf={user.cpf} onLogout={handleLogout} />}
      </main>

      {/* Bottom nav */}
      <nav style={{ background: "#fff", borderTop: "1px solid rgba(45,122,45,0.12)", display: "flex", position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: "430px", margin: "0 auto", zIndex: 50, flexShrink: 0 }}>
        {PRIMARY_TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "9px 0 8px", gap: 2, background: "none", border: "none", cursor: "pointer", position: "relative" }}
            >
              {active && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 2.5, background: "#2d7a2d", borderRadius: "0 0 3px 3px" }} />
              )}
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} style={{ color: active ? "#2d7a2d" : "#a8c8a8" }} />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: active ? 800 : 600, fontSize: "0.6rem", color: active ? "#2d7a2d" : "#a8c8a8" }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
