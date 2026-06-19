import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingDown, ShoppingCart, Calendar, Award } from "lucide-react";

interface SavingsTabProps {
  userName: string;
  cpf: string;
}

const monthlyData = [
  { month: "Jan", gasto: 820, poupado: 142 },
  { month: "Fev", gasto: 760, poupado: 118 },
  { month: "Mar", gasto: 910, poupado: 195 },
  { month: "Abr", gasto: 840, poupado: 163 },
  { month: "Mai", gasto: 780, poupado: 148 },
  { month: "Jun", gasto: 390, poupado: 87 },
];

const purchaseHistory = [
  { date: "10/06", items: 8, total: 134.50, saved: 28.40 },
  { date: "05/06", items: 12, total: 256.80, saved: 58.60 },
  { date: "28/05", items: 5, total: 89.90, saved: 12.00 },
  { date: "21/05", items: 15, total: 312.40, saved: 67.30 },
  { date: "14/05", items: 9, total: 178.60, saved: 34.50 },
  { date: "07/05", items: 11, total: 201.20, saved: 45.70 },
];

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

export function SavingsTab({ userName }: SavingsTabProps) {
  const [selectedMonth, setSelectedMonth] = useState(5);

  const currentData = monthlyData[selectedMonth];
  const totalSaved = monthlyData.reduce((sum, m) => sum + m.poupado, 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-5" style={{ background: "linear-gradient(135deg, #2d7a2d, #3d9a3d)" }}>
        <p className="text-white/80 text-xs mb-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Olá, {userName.split(" ")[0]} 👋
        </p>
        <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem" }}>
          Minhas Economias
        </h2>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/15 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown size={14} className="text-white/80" />
              <span className="text-white/80 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Total poupado</span>
            </div>
            <span className="text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.3rem" }}>
              R$ {totalSaved.toFixed(2).replace(".", ",")}
            </span>
            <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>em 2024</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Award size={14} className="text-white/80" />
              <span className="text-white/80 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Média mensal</span>
            </div>
            <span className="text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.3rem" }}>
              R$ {(totalSaved / 6).toFixed(2).replace(".", ",")}
            </span>
            <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>de economia</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Month selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <p className="text-sm mb-3" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
            Mês selecionado
          </p>
          <div className="flex gap-2">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(i)}
                className="flex-1 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  background: selectedMonth === i ? "#2d7a2d" : "#edf3ec",
                  color: selectedMonth === i ? "#fff" : "#5a7a5a",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Month detail */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl p-3" style={{ background: "#edf3ec" }}>
              <div className="flex items-center gap-1 mb-0.5">
                <ShoppingCart size={12} style={{ color: "#2d7a2d" }} />
                <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>Gasto total</span>
              </div>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#1a2e1a" }}>
                R$ {currentData.gasto.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="rounded-xl p-3" style={{ background: "#fff9ee" }}>
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingDown size={12} style={{ color: "#f5a623" }} />
                <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>Economizado</span>
              </div>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#f5a623" }}>
                R$ {currentData.poupado.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Savings chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <p className="text-sm mb-3" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
            Economia por mês
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={monthlyData} barSize={16} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(45,122,45,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "#5a7a5a" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                formatter={(value: number) => [`R$ ${value.toFixed(2).replace(".", ",")}`, "Poupado"]}
              />
              <Bar dataKey="poupado" fill="#f5a623" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending trend */}
        <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <p className="text-sm mb-3" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
            Evolução dos gastos
          </p>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d7a2d" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2d7a2d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(45,122,45,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "#5a7a5a" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                formatter={(value: number) => [`R$ ${value.toFixed(2).replace(".", ",")}`, "Gasto"]}
              />
              <Area type="monotone" dataKey="gasto" stroke="#2d7a2d" strokeWidth={2.5} fill="url(#colorGasto)" dot={{ fill: "#2d7a2d", r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Purchase history */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <div className="px-4 pt-4 pb-3 flex items-center gap-2">
            <Calendar size={16} style={{ color: "#2d7a2d" }} />
            <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
              Histórico de compras
            </p>
          </div>
          {purchaseHistory.map((purchase, i) => (
            <div
              key={i}
              className="px-4 py-3 flex items-center gap-3"
              style={{ borderTop: i > 0 ? "1px solid rgba(45,122,45,0.08)" : "none" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#edf3ec" }}>
                <ShoppingCart size={16} style={{ color: "#2d7a2d" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                  {purchase.items} itens
                </p>
                <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                  {purchase.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                  R$ {purchase.total.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#2d7a2d", fontWeight: 700 }}>
                  -R$ {purchase.saved.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
