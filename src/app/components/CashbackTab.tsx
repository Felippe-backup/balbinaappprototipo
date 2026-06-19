import { Wallet, Clock, TrendingUp, ChevronRight, Gift } from "lucide-react";

const cashbackHistory = [
  { date: "10/06", desc: "Compra R$ 134,50",        tipo: "crédito",  valor: 2.69,  status: "disponível" },
  { date: "05/06", desc: "Compra R$ 256,80",         tipo: "crédito",  valor: 5.14,  status: "disponível" },
  { date: "05/06", desc: "Campanha Grãos +100%",     tipo: "crédito",  valor: 5.14,  status: "disponível" },
  { date: "28/05", desc: "Compra R$ 89,90",           tipo: "crédito",  valor: 1.80,  status: "disponível" },
  { date: "10/05", desc: "Resgate no caixa",          tipo: "resgate",  valor: -15.00, status: "usado" },
  { date: "21/05", desc: "Compra R$ 312,40",          tipo: "crédito",  valor: 6.25,  status: "disponível" },
  { date: "14/05", desc: "Compra R$ 178,60",          tipo: "crédito",  valor: 3.57,  status: "disponível" },
  { date: "07/05", desc: "Compra R$ 201,20",          tipo: "crédito",  valor: 4.02,  status: "disponível" },
];

const pendingBalance = 3.21;
const availableBalance = 24.61;

const upcomingExpiry = [
  { valor: 5.14, vencimento: "05/07", desc: "Cashback de 05/06" },
  { valor: 2.69, vencimento: "10/07", desc: "Cashback de 10/06" },
];

export function CashbackTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      {/* Wallet card */}
      <div style={{ padding: "20px 16px 24px", background: "linear-gradient(135deg, #14b8a6, #0d9488)" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", margin: "0 0 2px" }}>Carteira de Cashback</p>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: "0 0 2px" }}>Saldo disponível</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: 0 }}>
            R$ {availableBalance.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.65)", margin: "0 0 2px" }}>Pendente</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.9rem", color: "#fff", margin: 0 }}>R$ {pendingBalance.toFixed(2).replace(".", ",")}</p>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.65)", margin: "0 0 2px" }}>Total ganho 2024</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.9rem", color: "#fff", margin: 0 }}>R$ 48,20</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "14px 16px", background: "#f7f9f4", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Expiry alert */}
        <div style={{ background: "#fff9ee", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(245,166,35,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Clock size={14} style={{ color: "#f5a623" }} />
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#1a2e1a", margin: 0 }}>Próximos vencimentos</p>
          </div>
          {upcomingExpiry.map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: i > 0 ? "1px solid rgba(245,166,35,0.12)" : "none" }}>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#1a2e1a", margin: 0, fontWeight: 700 }}>{e.desc}</p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.68rem", color: "#5a7a5a", margin: 0 }}>vence em {e.vencimento}</p>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.88rem", color: "#f5a623" }}>R$ {e.valor.toFixed(2).replace(".", ",")}</span>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(45,122,45,0.1)" }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#1a2e1a", margin: "0 0 10px" }}>💡 Regras de cashback</p>
          {[
            ["2% de volta em todas as compras"],
            ["4% dobrado em promoções selecionadas"],
            ["Válido por 30 dias após o crédito"],
            ["Resgate no caixa informando o CPF"],
            ["Mín. R$ 5,00 para resgatar"],
          ].map(([rule], i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderTop: i > 0 ? "1px solid rgba(45,122,45,0.06)" : "none" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2d7a2d", marginTop: 6, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#1a2e1a", margin: 0, lineHeight: 1.4 }}>{rule}</p>
            </div>
          ))}
        </div>

        {/* Campaign banner */}
        <div style={{ background: "linear-gradient(135deg, #2d7a2d, #3d9a3d)", borderRadius: 14, padding: "14px 16px" }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#fff", margin: "0 0 3px" }}>🎉 Cashback Duplo!</p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", margin: "0 0 8px" }}>
            Esta semana: 4% de volta em Hortifruti e Laticínios. Válido até 16/06.
          </p>
          <div style={{ height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 3 }}>
            <div style={{ width: "70%", height: "100%", background: "#fff", borderRadius: 3 }} />
          </div>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", margin: "4px 0 0" }}>7 de 10 dias restantes</p>
        </div>

        {/* History */}
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(45,122,45,0.1)" }}>
          <div style={{ padding: "12px 14px 8px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#1a2e1a", margin: 0 }}>Histórico</p>
          </div>
          {cashbackHistory.map((h, i) => (
            <div key={i} style={{ padding: "10px 14px", borderTop: "1px solid rgba(45,122,45,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: h.tipo === "crédito" ? "#edf3ec" : "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {h.tipo === "crédito" ? <TrendingUp size={14} style={{ color: "#2d7a2d" }} /> : <Gift size={14} style={{ color: "#d4183d" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#1a2e1a", margin: 0 }}>{h.desc}</p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.65rem", color: "#5a7a5a", margin: 0 }}>{h.date}</p>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.88rem", color: h.valor > 0 ? "#14b8a6" : "#d4183d" }}>
                {h.valor > 0 ? "+" : ""}R$ {Math.abs(h.valor).toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
