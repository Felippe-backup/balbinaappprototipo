import { Shield, Star, Wallet, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

interface QRCodeTabProps {
  userName: string;
  cpf: string;
}

function maskCPF(cpf: string): string {
  return `${cpf.slice(0, 3)}.***.***-${cpf.slice(-2)}`;
}

// Simple QR-like SVG pattern
function QRPattern({ size = 200 }: { size?: number }) {
  const cells = 21;
  const cell = size / cells;
  // Deterministic pseudorandom fill to look like a QR
  const seed = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,0,1,1],
    [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0],
    [1,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [0,0,0,1,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,0,0,0],
    [1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1,0],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,1,0,1,0,1,0],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: 12 }}>
      <rect width={size} height={size} fill="#fff" rx={12} />
      {seed.map((row, ri) =>
        row.map((v, ci) =>
          v ? <rect key={`${ri}-${ci}`} x={ci * cell + 4} y={ri * cell + 4} width={cell - 1} height={cell - 1} fill="#1a2e1a" rx={1} /> : null
        )
      )}
    </svg>
  );
}

export function QRCodeTab({ userName, cpf }: QRCodeTabProps) {
  const [copied, setCopied] = useState(false);
  const loyaltyNumber = `BLB-${cpf.slice(0, 4)}-${cpf.slice(4, 8)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cpf).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      <div style={{ padding: "16px 16px 14px", background: "linear-gradient(135deg, #2d7a2d, #1e5c1e)" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", margin: "0 0 2px" }}>Cartão Digital</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", margin: 0 }}>Sua identificação no caixa</h2>
      </div>

      <div style={{ flex: 1, padding: "20px 16px", background: "#f7f9f4", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Card */}
        <div style={{ background: "linear-gradient(135deg, #1a2e1a 0%, #2d7a2d 100%)", borderRadius: 20, padding: "24px 22px", boxShadow: "0 8px 32px rgba(45,122,45,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", margin: 0 }}>dona Balbina</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>Programa de Fidelidade</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
              <Star size={12} fill="#f5a623" stroke="#f5a623" />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "#f5a623" }}>Nível Ouro</span>
            </div>
          </div>

          {/* QR code */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <div style={{ background: "#fff", padding: 10, borderRadius: 14 }}>
              <QRPattern size={160} />
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#fff", margin: "0 0 2px" }}>{userName}</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", margin: 0 }}>{maskCPF(cpf)}</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", margin: "0 0 1px" }}>Nº Fidelidade</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.82rem", color: "#fff", margin: 0 }}>{loyaltyNumber}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", margin: "0 0 1px" }}>Cashback</p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.82rem", color: "#14b8a6", margin: 0 }}>R$ 24,61</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(45,122,45,0.1)" }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "0.82rem", color: "#1a2e1a", margin: "0 0 10px" }}>Como usar no caixa</p>
          {[
            { n: "1", text: "Mostre o QR Code ao operador" },
            { n: "2", text: "Ou informe seu CPF verbalmente" },
            { n: "3", text: "Acumule pontos e cashback automaticamente" },
            { n: "4", text: "Seus descontos de promoção são aplicados" },
          ].map((step) => (
            <div key={step.n} style={{ display: "flex", gap: 10, padding: "7px 0", borderTop: step.n !== "1" ? "1px solid rgba(45,122,45,0.06)" : "none", alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#edf3ec", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", fontWeight: 700, color: "#2d7a2d" }}>{step.n}</span>
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#1a2e1a", margin: 0 }}>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleCopy}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 12, border: "1.5px solid rgba(45,122,45,0.3)", background: "transparent", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#2d7a2d", cursor: "pointer" }}
          >
            <Copy size={15} />
            {copied ? "CPF copiado!" : "Copiar CPF"}
          </button>
          <button
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", borderRadius: 12, border: "none", background: "#2d7a2d", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#fff", cursor: "pointer" }}
          >
            <RefreshCw size={15} />
            Atualizar QR
          </button>
        </div>
      </div>
    </div>
  );
}
