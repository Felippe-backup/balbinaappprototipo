// ─── Shared mock data for the entire admin panel ───────────────────────────

export const COLORS = {
  green: "#2d7a2d",
  greenLight: "#3d9a3d",
  greenDim: "#edf3ec",
  gold: "#f5a623",
  goldDim: "#fff9ee",
  red: "#d4183d",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  teal: "#14b8a6",
  orange: "#f97316",
  bg: "#0f1a0f",
  surface: "#162116",
  card: "#1c2b1c",
  border: "rgba(45,122,45,0.18)",
  text: "#e8f3e8",
  muted: "#6b8f6b",
};

export const revenueByDay = [
  { day: "Seg", receita: 4820, transacoes: 142, ticketMedio: 33.94 },
  { day: "Ter", receita: 5160, transacoes: 158, ticketMedio: 32.66 },
  { day: "Qua", receita: 6340, transacoes: 189, ticketMedio: 33.54 },
  { day: "Qui", receita: 5890, transacoes: 175, ticketMedio: 33.66 },
  { day: "Sex", receita: 8920, transacoes: 261, ticketMedio: 34.18 },
  { day: "Sáb", receita: 11450, transacoes: 334, ticketMedio: 34.28 },
  { day: "Dom", receita: 4210, transacoes: 122, ticketMedio: 34.51 },
];

export const revenueByMonth = [
  { month: "Jan", receita: 128400, meta: 120000 },
  { month: "Fev", receita: 115900, meta: 120000 },
  { month: "Mar", receita: 134200, meta: 130000 },
  { month: "Abr", receita: 142800, meta: 135000 },
  { month: "Mai", receita: 138600, meta: 140000 },
  { month: "Jun", receita: 76300, meta: 145000 },
];

export const hourlyHeatmap = [
  { hour: "07h", Seg: 12, Ter: 10, Qua: 15, Qui: 11, Sex: 18, Sáb: 22, Dom: 8 },
  { hour: "08h", Seg: 28, Ter: 31, Qua: 35, Qui: 29, Sex: 38, Sáb: 45, Dom: 18 },
  { hour: "09h", Seg: 42, Ter: 45, Qua: 52, Qui: 48, Sex: 58, Sáb: 72, Dom: 31 },
  { hour: "10h", Seg: 55, Ter: 58, Qua: 63, Qui: 61, Sex: 74, Sáb: 88, Dom: 42 },
  { hour: "11h", Seg: 61, Ter: 65, Qua: 70, Qui: 68, Sex: 82, Sáb: 96, Dom: 48 },
  { hour: "12h", Seg: 48, Ter: 52, Qua: 55, Qui: 50, Sex: 68, Sáb: 78, Dom: 38 },
  { hour: "13h", Seg: 35, Ter: 38, Qua: 40, Qui: 37, Sex: 55, Sáb: 62, Dom: 28 },
  { hour: "14h", Seg: 40, Ter: 43, Qua: 48, Qui: 45, Sex: 62, Sáb: 70, Dom: 22 },
  { hour: "15h", Seg: 52, Ter: 55, Qua: 60, Qui: 58, Sex: 72, Sáb: 85, Dom: 18 },
  { hour: "16h", Seg: 60, Ter: 63, Qua: 68, Qui: 65, Sex: 78, Sáb: 90, Dom: 14 },
  { hour: "17h", Seg: 72, Ter: 75, Qua: 80, Qui: 78, Sex: 92, Sáb: 100, Dom: 10 },
  { hour: "18h", Seg: 68, Ter: 71, Qua: 76, Qui: 74, Sex: 88, Sáb: 82, Dom: 6 },
  { hour: "19h", Seg: 45, Ter: 48, Qua: 52, Qui: 50, Sex: 62, Sáb: 45, Dom: 0 },
  { hour: "20h", Seg: 22, Ter: 25, Qua: 28, Qui: 26, Sex: 32, Sáb: 18, Dom: 0 },
];

export const topProducts = [
  { nome: "Arroz Agulhinha 5kg", categoria: "Grãos", unidades: 1840, receita: 34938, crescimento: +12 },
  { nome: "Frango Inteiro", categoria: "Carnes", unidades: 1620, receita: 24282, crescimento: +8 },
  { nome: "Feijão Carioca 1kg", categoria: "Grãos", unidades: 1510, receita: 12064, crescimento: +5 },
  { nome: "Leite Integral 1L", categoria: "Laticínios", unidades: 2890, receita: 13274, crescimento: -3 },
  { nome: "Café Pilão 500g", categoria: "Bebidas", unidades: 980, receita: 16641, crescimento: +22 },
  { nome: "Óleo de Soja 900ml", categoria: "Mercearia", unidades: 1240, receita: 8048, crescimento: +2 },
  { nome: "Banana Prata", categoria: "Hortifruti", unidades: 2100, receita: 9429, crescimento: +15 },
  { nome: "Macarrão Espaguete 500g", categoria: "Massas", unidades: 1680, receita: 5863, crescimento: -1 },
  { nome: "Queijo Mussarela", categoria: "Laticínios", unidades: 620, receita: 21694, crescimento: +6 },
  { nome: "Detergente Ypê 500ml", categoria: "Limpeza", unidades: 1920, receita: 5357, crescimento: -8 },
];

export const categoryShare = [
  { name: "Grãos", value: 22, fill: "#2d7a2d" },
  { name: "Carnes", value: 18, fill: "#f5a623" },
  { name: "Laticínios", value: 15, fill: "#3b82f6" },
  { name: "Hortifruti", value: 13, fill: "#14b8a6" },
  { name: "Mercearia", value: 12, fill: "#8b5cf6" },
  { name: "Bebidas", value: 10, fill: "#f97316" },
  { name: "Limpeza", value: 6, fill: "#6b8f6b" },
  { name: "Massas", value: 4, fill: "#e879f9" },
];

export const ageGroups = ["18–25", "26–35", "36–45", "46–60", "60+"];

export const consumptionByAge = [
  { produto: "Arroz 5kg",     "18–25": 210, "26–35": 480, "36–45": 620, "46–60": 390, "60+": 140 },
  { produto: "Frango",        "18–25": 180, "26–35": 420, "36–45": 560, "46–60": 310, "60+": 150 },
  { produto: "Feijão",        "18–25": 140, "26–35": 360, "36–45": 490, "46–60": 360, "60+": 160 },
  { produto: "Leite",         "18–25": 320, "26–35": 680, "36–45": 720, "46–60": 580, "60+": 590 },
  { produto: "Café Pilão",    "18–25": 60,  "26–35": 220, "36–45": 310, "46–60": 250, "60+": 140 },
  { produto: "Banana Prata",  "18–25": 280, "26–35": 490, "36–45": 540, "46–60": 460, "60+": 330 },
  { produto: "Queijo Muç.",   "18–25": 210, "26–35": 180, "36–45": 140, "46–60": 60,  "60+": 30  },
  { produto: "Detergente",    "18–25": 90,  "26–35": 380, "36–45": 560, "46–60": 490, "60+": 400 },
];

export const ageDistribution = [
  { faixa: "18–25", clientes: 312, pct: 12 },
  { faixa: "26–35", clientes: 698, pct: 27 },
  { faixa: "36–45", clientes: 834, pct: 32 },
  { faixa: "46–60", clientes: 520, pct: 20 },
  { faixa: "60+",   clientes: 236, pct: 9 },
];

export const customerSegments = [
  { segment: "Fiel",     count: 486, color: "#2d7a2d", desc: "Compra 3x/mês ou mais" },
  { segment: "Frequente",count: 712, color: "#3b82f6", desc: "Compra 1–2x/mês" },
  { segment: "Ocasional",count: 534, color: "#f5a623", desc: "Compra a cada 2–3 meses" },
  { segment: "Inativo",  count: 268, color: "#d4183d", desc: "Sem compras há 90+ dias" },
];

export const customers = [
  { id: "CPF-001", nome: "Maria Aparecida Santos", idade: 42, segmento: "Fiel",      ticketMedio: 187.40, compras: 38, ultimaCompra: "10/06", gasto: 7121, poupado: 1248 },
  { id: "CPF-002", nome: "João Carlos Oliveira",   idade: 29, segmento: "Frequente", ticketMedio: 94.20,  compras: 18, ultimaCompra: "09/06", gasto: 1696, poupado: 312  },
  { id: "CPF-003", nome: "Ana Lima",               idade: 67, segmento: "Fiel",      ticketMedio: 212.80, compras: 41, ultimaCompra: "11/06", gasto: 8725, poupado: 1534 },
  { id: "CPF-004", nome: "Pedro Henrique Ferreira",idade: 35, segmento: "Fiel",      ticketMedio: 143.60, compras: 29, ultimaCompra: "08/06", gasto: 4164, poupado: 730  },
  { id: "CPF-005", nome: "Claudia Rodrigues",      idade: 51, segmento: "Frequente", ticketMedio: 118.90, compras: 14, ultimaCompra: "05/06", gasto: 1665, poupado: 290  },
  { id: "CPF-006", nome: "Lucas Mendes",           idade: 22, segmento: "Ocasional", ticketMedio: 58.30,  compras: 6,  ultimaCompra: "28/05", gasto: 350,  poupado: 52   },
  { id: "CPF-007", nome: "Fernanda Costa",         idade: 38, segmento: "Fiel",      ticketMedio: 165.20, compras: 33, ultimaCompra: "10/06", gasto: 5452, poupado: 956  },
  { id: "CPF-008", nome: "Roberto Alves",          idade: 58, segmento: "Inativo",   ticketMedio: 231.40, compras: 12, ultimaCompra: "10/03", gasto: 2777, poupado: 498  },
  { id: "CPF-009", nome: "Mariana Pereira",        idade: 26, segmento: "Frequente", ticketMedio: 76.80,  compras: 20, ultimaCompra: "07/06", gasto: 1536, poupado: 268  },
  { id: "CPF-010", nome: "Antônio Barbosa",        idade: 71, segmento: "Fiel",      ticketMedio: 198.60, compras: 45, ultimaCompra: "11/06", gasto: 8937, poupado: 1562 },
  { id: "CPF-011", nome: "Juliana Nascimento",     idade: 33, segmento: "Ocasional", ticketMedio: 84.20,  compras: 8,  ultimaCompra: "18/05", gasto: 674,  poupado: 118  },
  { id: "CPF-012", nome: "Carlos Eduardo Souza",   idade: 44, segmento: "Frequente", ticketMedio: 134.50, compras: 22, ultimaCompra: "06/06", gasto: 2959, poupado: 518  },
];

export const campaigns = [
  {
    id: 1,
    nome: "Recuperação de Inativos",
    status: "ativa",
    segmentos: ["Inativo"],
    faixas: ["36–45", "46–60"],
    alcance: 268,
    abertura: 34,
    conversao: 12,
    inicio: "01/06",
    fim: "30/06",
    desconto: "15% em Grãos e Laticínios",
  },
  {
    id: 2,
    nome: "Fidelidade Premium",
    status: "ativa",
    segmentos: ["Fiel"],
    faixas: ["26–35", "36–45", "46–60"],
    alcance: 486,
    abertura: 61,
    conversao: 48,
    inicio: "05/06",
    fim: "20/06",
    desconto: "Desconto progressivo +compras",
  },
  {
    id: 3,
    nome: "Jovens Conscientes",
    status: "rascunho",
    segmentos: ["Frequente", "Ocasional"],
    faixas: ["18–25", "26–35"],
    alcance: 410,
    abertura: 0,
    conversao: 0,
    inicio: "15/06",
    fim: "15/07",
    desconto: "Hortifruti -20%",
  },
  {
    id: 4,
    nome: "Café da Manhã Completo",
    status: "encerrada",
    segmentos: ["Fiel", "Frequente"],
    faixas: ["46–60", "60+"],
    alcance: 320,
    abertura: 72,
    conversao: 38,
    inicio: "01/05",
    fim: "31/05",
    desconto: "Combo café + leite -25%",
  },
];

export const promotionROI = [
  { nome: "Recuperação de Inativos", investimento: 1200, retorno: 3840, roi: 220, unidades: 268 },
  { nome: "Fidelidade Premium", investimento: 2800, retorno: 8960, roi: 220, unidades: 486 },
  { nome: "Café da Manhã Completo", investimento: 1600, retorno: 3200, roi: 100, unidades: 320 },
];

export const stockAlerts = [
  { produto: "Arroz Agulhinha 5kg", categoria: "Grãos", status: "crítico", estoque: 45, minimo: 200, diasRestantes: 2 },
  { produto: "Frango Inteiro", categoria: "Carnes", status: "crítico", estoque: 12, minimo: 100, diasRestantes: 1 },
  { produto: "Leite Integral 1L", categoria: "Laticínios", status: "baixo", estoque: 89, minimo: 150, diasRestantes: 5 },
  { produto: "Café Pilão 500g", categoria: "Bebidas", status: "ok", estoque: 340, minimo: 100, diasRestantes: 30 },
];

export const stockTurnover = [
  { categoria: "Grãos", giro: 18, meta: 15, estoque: 2840, diasCobertura: 18 },
  { categoria: "Carnes", giro: 12, meta: 20, estoque: 1020, diasCobertura: 28 },
  { categoria: "Laticínios", giro: 22, meta: 20, estoque: 890, diasCobertura: 9 },
  { categoria: "Bebidas", giro: 16, meta: 18, estoque: 1230, diasCobertura: 21 },
];

export const wasteEstimate = [
  { mes: "Abr", pct: 2.1, desperdicio: 1248 },
  { mes: "Mai", pct: 1.8, desperdicio: 1064 },
  { mes: "Jun", pct: 2.3, desperdicio: 1356 },
];

export const expiryRisk = [
  { produto: "Leite Integral 1L", categoria: "Laticínios", lote: "L240612", validade: "13/06", quantidade: "24 un" },
  { produto: "Pão de Forma", categoria: "Padaria", lote: "P240611", validade: "14/06", quantidade: "18 un" },
  { produto: "Iogurte Natural", categoria: "Laticínios", lote: "Y240610", validade: "15/06", quantidade: "12 un" },
];

export const dailyComparison = [
  { day: "Seg", semanaAtual: 4820, semanaAnterior: 4100, anoAnterior: 3800 },
  { day: "Ter", semanaAtual: 5160, semanaAnterior: 4450, anoAnterior: 4100 },
  { day: "Qua", semanaAtual: 6340, semanaAnterior: 5200, anoAnterior: 4900 },
  { day: "Qui", semanaAtual: 5890, semanaAnterior: 5100, anoAnterior: 4700 },
  { day: "Sex", semanaAtual: 8920, semanaAnterior: 7300, anoAnterior: 6900 },
  { day: "Sáb", semanaAtual: 11450, semanaAnterior: 9800, anoAnterior: 9200 },
  { day: "Dom", semanaAtual: 4210, semanaAnterior: 3500, anoAnterior: 3100 },
];

export const paymentMethods = [
  { method: "Crédito", value: 38, pct: 38, fill: "#3b82f6" },
  { method: "Débito", value: 28, pct: 28, fill: "#14b8a6" },
  { method: "PIX", value: 22, pct: 22, fill: "#2d7a2d" },
  { method: "Boleto", value: 12, pct: 12, fill: "#f5a623" },
];

export const cashierPerformance = [
  { nome: "Caixa 1", receita: 8920, transacoes: 261, ticketMedio: 34.18, tempoMedio: "2.3s", erros: 0 },
  { nome: "Caixa 2", receita: 7840, transacoes: 232, ticketMedio: 33.79, tempoMedio: "2.1s", erros: 1 },
  { nome: "Caixa 3", receita: 6230, transacoes: 184, ticketMedio: 33.85, tempoMedio: "2.5s", erros: 0 },
  { nome: "Auto", receita: 3420, transacoes: 101, ticketMedio: 33.86, tempoMedio: "1.8s", erros: 2 },
];

export const marginByCategory = [
  { categoria: "Grãos", margemBruta: 22, margemLiquida: 18, receita: 18240, meta: 17000 },
  { categoria: "Carnes", margemBruta: 18, margemLiquida: 14, receita: 15680, meta: 14000 },
  { categoria: "Laticínios", margemBruta: 15, margemLiquida: 11, receita: 12340, meta: 11000 },
  { categoria: "Bebidas", margemBruta: 20, margemLiquida: 16, receita: 8960, meta: 8500 },
  { categoria: "Mercearia", margemBruta: 16, margemLiquida: 12, receita: 7430, meta: 7000 },
  { categoria: "Hortifruti", margemBruta: 12, margemLiquida: 8, receita: 6200, meta: 6000 },
];
