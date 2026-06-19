import { useState } from "react";
import { Logo } from "./Logo";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onLogin: (cpf: string, name: string) => void;
  onAdminLogin: () => void;
}

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function validateCPF(cpf: string): boolean {
  return cpf.replace(/\D/g, "").length === 11;
}

export function LoginScreen({ onLogin, onAdminLogin }: LoginScreenProps) {
  const [mode, setMode] = useState<"login" | "register" | "admin">("login");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "admin") {
      if (adminPass !== "balbina@adm") {
        setError("Senha administrativa incorreta.");
        return;
      }
      onAdminLogin();
      return;
    }

    if (!validateCPF(cpf)) {
      setError("CPF inválido. Digite os 11 dígitos.");
      return;
    }
    if (mode === "register" && name.trim().length < 2) {
      setError("Digite seu nome completo.");
      return;
    }
    const savedName =
      mode === "login"
        ? localStorage.getItem(`balbina_name_${cpf.replace(/\D/g, "")}`) || "Cliente"
        : name;
    localStorage.setItem(`balbina_name_${cpf.replace(/\D/g, "")}`, savedName);
    onLogin(cpf.replace(/\D/g, ""), savedName);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #2d7a2d 0%, #1e5c1e 45%, #f7f9f4 45%)" }}
    >
      <div className="flex flex-col items-center pt-12 pb-6 px-6">
        <Logo size={96} />
        <h1
          className="mt-4 text-white text-center"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1.2 }}
        >
          dona<br />
          <span style={{ fontSize: "2.4rem" }}>Balbina</span>
        </h1>
        <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Desde 1960 • Seu mercado de confiança
        </p>
      </div>

      <div className="flex-1 bg-[#f7f9f4] rounded-t-3xl px-6 pt-8 pb-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-border mb-6">
            {(["login", "register", "admin"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setError(""); }}
                className="flex-1 py-2.5 text-xs transition-colors flex items-center justify-center gap-1.5"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  background: mode === tab ? "#2d7a2d" : "transparent",
                  color: mode === tab ? "#fff" : "#5a7a5a",
                }}
              >
                {tab === "admin" && <ShieldCheck size={13} />}
                {tab === "login" ? "Entrar" : tab === "register" ? "Cadastrar" : "Adm"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "admin" ? (
              <>
                <div className="flex items-center gap-2 p-3 rounded-xl mb-2" style={{ background: "#edf3ec" }}>
                  <ShieldCheck size={16} style={{ color: "#2d7a2d" }} />
                  <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                    Acesso restrito à equipe Dona Balbina
                  </p>
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                    Senha administrativa
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={adminPass}
                      onChange={(e) => { setAdminPass(e.target.value); setError(""); }}
                      placeholder="••••••••••"
                      className="w-full px-4 py-3 rounded-xl outline-none text-sm pr-11"
                      style={{ background: "#edf3ec", fontFamily: "'Nunito', sans-serif", color: "#1a2e1a", border: "2px solid transparent", transition: "border-color 0.2s" }}
                      onFocus={(e) => { e.target.style.borderColor = "#2d7a2d"; }}
                      onBlur={(e) => { e.target.style.borderColor = "transparent"; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#5a7a5a" }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs mt-1.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                    Senha de demonstração: <span style={{ fontFamily: "'DM Mono', monospace", color: "#2d7a2d" }}>balbina@adm</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                {mode === "register" && (
                  <div>
                    <label className="block text-sm mb-1.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                      Seu nome
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      placeholder="Maria da Silva"
                      className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                      style={{ background: "#edf3ec", fontFamily: "'Nunito', sans-serif", color: "#1a2e1a", border: "2px solid transparent", transition: "border-color 0.2s" }}
                      onFocus={(e) => { e.target.style.borderColor = "#2d7a2d"; }}
                      onBlur={(e) => { e.target.style.borderColor = "transparent"; }}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm mb-1.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                    CPF
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                    style={{ background: "#edf3ec", fontFamily: "'Nunito', sans-serif", color: "#1a2e1a", border: "2px solid transparent", transition: "border-color 0.2s" }}
                    onFocus={(e) => { e.target.style.borderColor = "#2d7a2d"; }}
                    onBlur={(e) => { e.target.style.borderColor = "transparent"; }}
                  />
                  {mode === "login" && (
                    <p className="text-xs mt-1.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                      Use o mesmo CPF que você informa no caixa
                    </p>
                  )}
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-red-600" style={{ fontFamily: "'Nunito', sans-serif" }}>{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: "#2d7a2d", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1rem" }}
            >
              {mode === "login" ? "Acessar minha conta" : mode === "register" ? "Criar conta grátis" : "Acessar painel ADM"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
          Ao continuar, você concorda com o uso do CPF para registro de compras e consulta de promoções exclusivas.
        </p>
      </div>
    </div>
  );
}
