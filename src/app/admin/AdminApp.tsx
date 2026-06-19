import { useState } from "react";
import {
  LayoutDashboard, Users, Package, Megaphone,
  LogOut, ShieldCheck, DollarSign, BarChart2,
  TrendingDown, Activity, Brain, Menu, X, ChevronRight,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { AdminDashboard } from "./AdminDashboard";
import { AdminClientes } from "./AdminClientes";
import { AdminProdutos } from "./AdminProdutos";
import { AdminCampanhas } from "./AdminCampanhas";
import { AdminFinanceiro } from "./AdminFinanceiro";
import { AdminEstoque } from "./AdminEstoque";
import { AdminCRM } from "./AdminCRM";
import { AdminRFM } from "./AdminRFM";
import { AdminChurn } from "./AdminChurn";
import { AdminTelemetria } from "./AdminTelemetria";
import { AdminExecutivo } from "./AdminExecutivo";
import { useIsMobile } from "./useIsMobile";
import { COLORS } from "./adminData";

const C = COLORS;

type AdminTab =
  | "dashboard" | "executivo" | "financeiro" | "estoque"
  | "crm" | "rfm" | "churn" | "telemetria"
  | "produtos" | "campanhas" | "clientes";

interface NavGroup {
  label: string;
  items: { id: AdminTab; label: string; short: string; Icon: React.ElementType }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Visão",
    items: [
      { id: "dashboard",  label: "Visão Geral",  short: "Geral",    Icon: LayoutDashboard },
      { id: "executivo",  label: "Executivo",     short: "Exec.",    Icon: Brain },
    ],
  },
  {
    label: "Negócio",
    items: [
      { id: "financeiro", label: "Financeiro",    short: "Finan.",   Icon: DollarSign },
      { id: "estoque",    label: "Estoque",       short: "Estoque",  Icon: Package },
      { id: "produtos",   label: "Produtos",      short: "Prods.",   Icon: BarChart2 },
    ],
  },
  {
    label: "Clientes",
    items: [
      { id: "crm",        label: "CRM",           short: "CRM",      Icon: Users },
      { id: "rfm",        label: "Análise RFM",   short: "RFM",      Icon: Activity },
      { id: "churn",      label: "Churn",         short: "Churn",    Icon: TrendingDown },
      { id: "clientes",   label: "Cadastro",      short: "Cadastro", Icon: Users },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "telemetria", label: "Telemetria",    short: "Telm.",    Icon: Activity },
      { id: "campanhas",  label: "Campanhas",     short: "Camp.",    Icon: Megaphone },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

function renderTab(id: AdminTab, isMobile: boolean) {
  const props = { isMobile };
  switch (id) {
    case "dashboard":  return <AdminDashboard  {...props} />;
    case "executivo":  return <AdminExecutivo  {...props} />;
    case "financeiro": return <AdminFinanceiro {...props} />;
    case "estoque":    return <AdminEstoque    {...props} />;
    case "produtos":   return <AdminProdutos   {...props} />;
    case "crm":        return <AdminCRM        {...props} />;
    case "rfm":        return <AdminRFM        {...props} />;
    case "churn":      return <AdminChurn      {...props} />;
    case "clientes":   return <AdminClientes   {...props} />;
    case "telemetria": return <AdminTelemetria {...props} />;
    case "campanhas":  return <AdminCampanhas  {...props} />;
  }
}

interface AdminAppProps {
  onLogout: () => void;
}

export function AdminApp({ onLogout }: AdminAppProps) {
  const isMobile = useIsMobile(900);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeItem = ALL_ITEMS.find((i) => i.id === activeTab)!;

  const handleNav = (id: AdminTab) => {
    setActiveTab(id);
    setDrawerOpen(false);
  };

  // ── Desktop layout ─────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div style={{ display: "flex", height: "100vh", background: C.bg, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", overflowY: "auto", scrollbarWidth: "none" }}>
          <SidebarBrand />
          <nav style={{ flex: 1, padding: "12px 10px" }}>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 4 }}>
                  {group.label}
                </p>
                {group.items.map(({ id, label, Icon }) => {
                  const active = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleNav(id)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "9px 10px", borderRadius: 9, border: "none", cursor: "pointer", background: active ? `${C.green}22` : "transparent", marginBottom: 1, transition: "background 0.12s" }}
                      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = `${C.green}0f`; }}
                      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <Icon size={15} style={{ color: active ? C.green : C.muted }} />
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: active ? 800 : 600, fontSize: "0.82rem", color: active ? C.green : C.muted }}>{label}</span>
                      </div>
                      {active && <ChevronRight size={12} style={{ color: C.green }} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          <SidebarFooter onLogout={onLogout} />
        </aside>

        {/* Main */}
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <DesktopTopBar activeItem={activeItem} />
          <div style={{ flex: 1, overflow: "hidden" }}>{renderTab(activeTab, false)}</div>
        </main>
      </div>
    );
  }

  // ── Mobile layout ──────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", background: C.bg, overflow: "hidden" }}>
      {/* Mobile header */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={30} />
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "0.95rem", color: C.text }}>Balbina</span>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.6rem", color: C.muted, margin: 0, lineHeight: 1 }}>ADM</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: C.green }}>{activeItem.label}</span>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: `${C.green}22`, border: "none", borderRadius: 9, padding: 8, cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Menu size={18} style={{ color: C.green }} />
          </button>
        </div>
      </header>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 260,
        background: C.surface, borderLeft: `1px solid ${C.border}`,
        zIndex: 101, display: "flex", flexDirection: "column",
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: `${C.green}18`, borderRadius: 8, border: `1px solid ${C.green}33` }}>
            <ShieldCheck size={12} style={{ color: C.green }} />
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: C.green }}>Painel ADM</span>
          </div>
          <button onClick={() => setDrawerOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} style={{ color: C.muted }} />
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "12px 10px" }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 18 }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 4 }}>
                {group.label}
              </p>
              {group.items.map(({ id, label, Icon }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 9, border: "none", cursor: "pointer", background: active ? `${C.green}22` : "transparent", marginBottom: 2, textAlign: "left" }}
                  >
                    <Icon size={16} style={{ color: active ? C.green : C.muted, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: active ? 800 : 600, fontSize: "0.85rem", color: active ? C.green : C.muted }}>{label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.border}` }}>
          <button
            onClick={onLogout}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer", background: "transparent", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: C.muted }}
          >
            <LogOut size={15} />
            Sair do painel
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {renderTab(activeTab, true)}
      </div>
    </div>
  );
}

function SidebarBrand() {
  return (
    <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Logo size={34} />
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "0.95rem", color: COLORS.text, margin: 0 }}>Balbina</p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: COLORS.muted, margin: 0 }}>Desde 1988</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: `${COLORS.green}18`, borderRadius: 8, border: `1px solid ${COLORS.green}33` }}>
        <ShieldCheck size={11} style={{ color: COLORS.green }} />
        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: COLORS.green }}>Painel Administrativo</span>
      </div>
    </div>
  );
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={{ padding: "12px 10px", borderTop: `1px solid ${COLORS.border}` }}>
      <div style={{ padding: "9px 10px", marginBottom: 6, background: COLORS.card, borderRadius: 9 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: COLORS.text, margin: 0 }}>Administrador</p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", color: COLORS.muted, margin: "1px 0 0" }}>adm@donabalbina.com</p>
      </div>
      <button
        onClick={onLogout}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 9, border: "none", cursor: "pointer", background: "transparent", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: COLORS.muted, transition: "color 0.15s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = COLORS.red; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = COLORS.muted; }}
      >
        <LogOut size={14} />
        Sair do painel
      </button>
    </div>
  );
}

function DesktopTopBar({ activeItem }: { activeItem: { label: string; Icon: React.ElementType } }) {
  const C = COLORS;
  return (
    <header style={{ height: 52, flexShrink: 0, background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <activeItem.Icon size={15} style={{ color: C.green }} />
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: C.muted }}>{activeItem.label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 5px ${C.green}` }} />
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: C.muted }}>Sistema online</span>
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: C.muted }}>17/06/2024 · 18:42</span>
      </div>
    </header>
  );
}
