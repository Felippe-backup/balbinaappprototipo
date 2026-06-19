import { useState } from "react";
import { Clock, MapPin, Phone, ChevronDown, ChevronUp, Plus, Trash2, CheckSquare, Square } from "lucide-react";

interface ShoppingItem {
  id: number;
  text: string;
  done: boolean;
}

const recipes = [
  {
    id: 1,
    name: "Frango ao Molho Verde",
    emoji: "🍗",
    time: "40 min",
    ingredients: ["Frango", "Cebola", "Alho", "Salsinha", "Limão"],
    tip: "Use o frango em promoção desta semana!",
  },
  {
    id: 2,
    name: "Arroz Carreteiro",
    emoji: "🍚",
    time: "30 min",
    ingredients: ["Arroz", "Linguiça", "Tomate", "Alho", "Cebola"],
    tip: "Aproveite o arroz em oferta!",
  },
  {
    id: 3,
    name: "Salada de Frutas",
    emoji: "🍎",
    time: "15 min",
    ingredients: ["Banana", "Mamão", "Laranja", "Mel"],
    tip: "Banana prata fresquinha essa semana.",
  },
];

const storeHours = [
  { day: "Segunda a Sexta", hours: "07:00 – 21:00" },
  { day: "Sábado", hours: "07:00 – 20:00" },
  { day: "Domingo", hours: "08:00 – 14:00" },
  { day: "Feriados", hours: "08:00 – 13:00" },
];

export function ExtrasTab() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: 1, text: "Arroz 5kg", done: false },
    { id: 2, text: "Frango inteiro", done: true },
    { id: 3, text: "Leite 1L", done: false },
  ]);
  const [newItem, setNewItem] = useState("");
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const addItem = () => {
    if (!newItem.trim()) return;
    setShoppingList((prev) => [...prev, { id: Date.now(), text: newItem.trim(), done: false }]);
    setNewItem("");
  };

  const toggleItem = (id: number) => {
    setShoppingList((prev) => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const removeItem = (id: number) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const done = shoppingList.filter((i) => i.done).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-5" style={{ background: "linear-gradient(135deg, #2d7a2d, #3d9a3d)" }}>
        <h2 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem" }}>
          Mais serviços
        </h2>
        <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Lista de compras, receitas e informações da loja
        </p>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Shopping list */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
                🛒 Lista de compras
              </p>
              <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                {done}/{shoppingList.length} itens marcados
              </p>
            </div>
            {done > 0 && (
              <button
                onClick={() => setShoppingList((prev) => prev.filter((i) => !i.done))}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#d4183d", background: "#fff0f0" }}
              >
                Limpar feitos
              </button>
            )}
          </div>

          <div className="px-4 pb-3 flex gap-2">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Adicionar item..."
              className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "#edf3ec", fontFamily: "'Nunito', sans-serif", color: "#1a2e1a" }}
            />
            <button
              onClick={addItem}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#2d7a2d" }}
            >
              <Plus size={18} className="text-white" />
            </button>
          </div>

          <div className="px-4 pb-4 space-y-1.5">
            {shoppingList.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-1.5">
                <button onClick={() => toggleItem(item.id)} className="flex-shrink-0">
                  {item.done
                    ? <CheckSquare size={20} style={{ color: "#2d7a2d" }} />
                    : <Square size={20} style={{ color: "#a8c8a8" }} />
                  }
                </button>
                <span
                  className="flex-1 text-sm"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 600,
                    color: item.done ? "#5a7a5a" : "#1a2e1a",
                    textDecoration: item.done ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </span>
                <button onClick={() => removeItem(item.id)} className="flex-shrink-0 p-1">
                  <Trash2 size={14} style={{ color: "#ccc" }} />
                </button>
              </div>
            ))}
            {shoppingList.length === 0 && (
              <p className="text-center py-3 text-sm" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                Lista vazia. Adicione itens acima!
              </p>
            )}
          </div>
        </div>

        {/* Recipes */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <div className="px-4 pt-4 pb-3">
            <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
              👩‍🍳 Receitas da semana
            </p>
            <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
              Usando produtos em oferta
            </p>
          </div>
          {recipes.map((recipe, i) => (
            <div key={recipe.id} style={{ borderTop: "1px solid rgba(45,122,45,0.08)" }}>
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                className="w-full px-4 py-3 flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "#edf3ec" }}>
                  {recipe.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                    {recipe.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} style={{ color: "#5a7a5a" }} />
                    <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                      {recipe.time}
                    </span>
                  </div>
                </div>
                {expandedRecipe === recipe.id
                  ? <ChevronUp size={16} style={{ color: "#5a7a5a" }} />
                  : <ChevronDown size={16} style={{ color: "#5a7a5a" }} />
                }
              </button>
              {expandedRecipe === recipe.id && (
                <div className="px-4 pb-4">
                  <div className="rounded-xl p-3" style={{ background: "#edf3ec" }}>
                    <p className="text-xs mb-1.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
                      Ingredientes principais:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {recipe.ingredients.map((ing) => (
                        <span key={ing} className="px-2 py-0.5 rounded-full text-xs bg-white" style={{ fontFamily: "'Nunito', sans-serif", color: "#2d7a2d", fontWeight: 700 }}>
                          {ing}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-start gap-1.5 p-2 rounded-lg" style={{ background: "#fff9ee" }}>
                      <span className="text-xs">💡</span>
                      <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                        {recipe.tip}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Store info */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid rgba(45,122,45,0.1)" }}>
          <div className="px-4 pt-4 pb-3">
            <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: "#1a2e1a" }}>
              🏪 Informações da loja
            </p>
          </div>

          <div className="px-4 pb-2 flex items-start gap-3" style={{ borderTop: "1px solid rgba(45,122,45,0.08)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-2.5" style={{ background: "#edf3ec" }}>
              <Clock size={16} style={{ color: "#2d7a2d" }} />
            </div>
            <div className="flex-1 pt-2.5 pb-3">
              <p className="text-sm mb-1.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                Horário de funcionamento
              </p>
              {storeHours.map((h) => (
                <div key={h.day} className="flex justify-between py-0.5">
                  <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>{h.day}</span>
                  <span className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 flex items-center gap-3" style={{ borderTop: "1px solid rgba(45,122,45,0.08)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#edf3ec" }}>
              <MapPin size={16} style={{ color: "#2d7a2d" }} />
            </div>
            <div>
              <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                Endereço
              </p>
              <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                Rua das Flores, 240 – Centro
              </p>
            </div>
          </div>

          <div className="px-4 py-3 flex items-center gap-3" style={{ borderTop: "1px solid rgba(45,122,45,0.08)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#edf3ec" }}>
              <Phone size={16} style={{ color: "#2d7a2d" }} />
            </div>
            <div>
              <p className="text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1a2e1a" }}>
                Telefone
              </p>
              <p className="text-xs" style={{ fontFamily: "'Nunito', sans-serif", color: "#5a7a5a" }}>
                (11) 3456-7890
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
