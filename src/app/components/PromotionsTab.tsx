import { useState } from "react";
import { Search, Tag, Clock, Star, ChevronRight } from "lucide-react";

interface Promotion {
  id: number;
  name: string;
  originalPrice: number;
  promoPrice: number;
  discount: number;
  category: string;
  unit: string;
  until: string;
  highlight: boolean;
  emoji: string;
}

const promotions: Promotion[] = [
  { id: 1, name: "Arroz Agulhinha 5kg", originalPrice: 28.90, promoPrice: 18.99, discount: 34, category: "Grãos", unit: "pct", until: "15/06", highlight: true, emoji: "🍚" },
  { id: 2, name: "Feijão Carioca 1kg", originalPrice: 12.50, promoPrice: 7.99, discount: 36, category: "Grãos", unit: "pct", until: "15/06", highlight: true, emoji: "🫘" },
  { id: 3, name: "Frango Inteiro", originalPrice: 22.00, promoPrice: 14.99, discount: 32, category: "Carnes", unit: "kg", until: "14/06", highlight: true, emoji: "🍗" },
  { id: 4, name: "Leite Integral 1L", originalPrice: 6.80, promoPrice: 4.59, discount: 32, category: "Laticínios", unit: "cx", until: "18/06", highlight: false, emoji: "🥛" },
  { id: 5, name: "Óleo de Soja 900ml", originalPrice: 9.90, promoPrice: 6.49, discount: 34, category: "Mercearia", unit: "un", until: "20/06", highlight: false, emoji: "🫙" },
  { id: 6, name: "Macarrão Espaguete 500g", originalPrice: 5.90, promoPrice: 3.49, discount: 41, category: "Massas", unit: "pct", until: "20/06", highlight: false, emoji: "🍝" },
  { id: 7, name: "Tomate Cereja", originalPrice: 11.90, promoPrice: 6.99, discount: 41, category: "Hortifruti", unit: "kg", until: "13/06", highlight: false, emoji: "🍅" },
  { id: 8, name: "Banana Prata", originalPrice: 7.50, promoPrice: 4.49, discount: 40, category: "Hortifruti", unit: "kg", until: "13/06", highlight: false, emoji: "🍌" },
  { id: 9, name: "Queijo Mussarela", originalPrice: 49.90, promoPrice: 34.99, discount: 30, category: "Laticínios", unit: "kg", until: "16/06", highlight: false, emoji: "🧀" },
  { id: 10, name: "Detergente Ypê 500ml", originalPrice: 4.50, promoPrice: 2.79, discount: 38, category: "Limpeza", unit: "un", until: "22/06", highlight: false, emoji: "🧴" },
  { id: 11, name: "Café Pilão 500g", originalPrice: 24.90, promoPrice: 16.99, discount: 32, category: "Bebidas", unit: "pct", until: "21/06", highlight: false, emoji: "☕" },
  { id: 12, name: "Açúcar Cristal 5kg", originalPrice: 22.90, promoPrice: 15.49, discount: 32, category: "Mercearia", unit: "pct", until: "20/06", highlight: false, emoji: "🍬" },
];

const categories = ["Todos", "Hortifruti", "Carnes", "Grãos", "Laticínios", "Mercearia", "Massas", "Bebidas", "Limpeza"];

export function PromotionsTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = promotions.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const highlights = filtered.filter((p) => p.highlight);
  const regular = filtered.filter((p) => !p.highlight);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header banner */}
      <div className="px-4 pt-4 pb-3" style={{ background: "linear-gradient(135deg, #2d7a2d, #3d9a3d)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/80 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Semana de</p>
            <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem" }}>
              Ofertas Especiais
            </h2>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1.5 flex items-center gap-1">
            <Tag size={12} className="text-white" />
            <span className="text-white text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
              {promotions.length} ofertas
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2.5">
          <Search size={16} className="text-white/70" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produto..."
            className="bg-transparent text-white placeholder-white/60 text-sm outline-none flex-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              background: activeCategory === cat ? "#2d7a2d" : "#e8f3e8",
              color: activeCategory === cat ? "#fff" : "#2d7a2d",
              flexShrink: 0,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* Highlights */}
        {highlights.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Star size={14} fill="#f5a623" stroke="#f5a623" />
              <span className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
                Destaques da semana
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((promo) => (
                <HighlightCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        )}

        {/* Regular */}
        {regular.length > 0 && (
          <div>
            <p className="text-sm mb-3" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
              Todas as ofertas
            </p>
            <div className="grid grid-cols-2 gap-3">
              {regular.map((promo) => (
                <SmallCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
              Nenhuma oferta encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function HighlightCard({ promo }: { promo: Promotion }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "#edf3ec" }}>
        {promo.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
          {promo.name}
        </p>
        <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
          por {promo.unit}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#2d7a2d" }}>
            R$ {promo.promoPrice.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-xs line-through" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
            R$ {promo.originalPrice.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="px-2 py-0.5 rounded-lg" style={{ background: "#f5a623" }}>
          <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: "#1a2e1a" }}>
            -{promo.discount}%
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <Clock size={10} style={{ color: "#5a7a5a" }} />
          <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
            até {promo.until}
          </span>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ promo }: { promo: Promotion }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
      <div className="w-full h-14 rounded-xl flex items-center justify-center text-2xl mb-2" style={{ background: "#edf3ec" }}>
        {promo.emoji}
      </div>
      <p className="text-xs leading-tight" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
        {promo.name}
      </p>
      <p className="text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
        {promo.unit}
      </p>
      <div className="mt-auto pt-2 flex items-end justify-between">
        <div>
          <span className="text-xs line-through block" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
            R$ {promo.originalPrice.toFixed(2).replace(".", ",")}
          </span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "0.95rem", color: "#2d7a2d" }}>
            R$ {promo.promoPrice.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="px-1.5 py-0.5 rounded-md" style={{ background: "#f5a623" }}>
          <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: "#1a2e1a" }}>
            -{promo.discount}%
          </span>
        </div>
      </div>
    </div>
  );
}
