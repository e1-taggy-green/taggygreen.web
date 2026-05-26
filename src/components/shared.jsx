import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, Building2, Calculator } from "lucide-react";

export function Logo({ size = "md", onClick }) {
  // Ajustado o tamanho 'md' para ser text-base no mobile e text-xl no desktop, evitando esmagar a Nav
  const sizes = { sm: "text-xs sm:text-base", md: "text-base sm:text-xl", lg: "text-2xl sm:text-3xl" };
  const iconSizes = { sm: "w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm", md: "w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-lg", lg: "w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl" };
  
  return (
    <button onClick={onClick} className="flex items-center gap-2 focus:outline-none flex-shrink-0 text-left">
      <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg shadow-green-200 flex-shrink-0`}>
        <Leaf className="text-white" size={size === "sm" ? 14 : size === "md" ? 18 : 28} />
      </div>
      <span className={`${sizes[size]} font-black tracking-tight leading-tight text-gray-900`} style={{ fontFamily: "'Syne',sans-serif" }}>
        Edenred <span className="text-green-600 block xs:inline">TaggyGreen</span>
      </span>
    </button>
  );
}

export function Nav({ activePage, showB2bB2c = true }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      {/* Container principal flexível com h-auto e py-3 no mobile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-auto py-3 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* LOGO */}
        <Logo size="md" onClick={() => navigate("/")} />

        {/* ÁREA DE PORTAIS RESPONSIVA */}
        {showB2bB2c && (
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto whitespace-nowrap scrollbar-none justify-center sm:justify-end py-1">
            
            {/* PORTAL B2C */}
            <button
              onClick={() => navigate("/b2c/hub")}
              className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 flex-shrink-0 ${
                activePage === "b2c" 
                  ? "bg-green-500 text-white shadow-md shadow-green-200" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User size={14} /> Portal B2C
            </button>
            
            {/* GESTÃO B2B */}
            <button
              onClick={() => navigate("/b2b/dashboard")}
              className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 flex-shrink-0 ${
                activePage === "b2b" 
                  ? "bg-green-500 text-white shadow-md shadow-green-200" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Building2 size={14} /> Gestão B2B
            </button>
            
            {/* SIMULADOR: Sumirá completamente da árvore se a página ativa for 'b2b' */}
            {activePage !== "b2b" && (
              <button
                onClick={() => navigate("/b2b/simulador")}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold border border-green-500 text-green-700 hover:bg-green-50 transition-all duration-150 flex-shrink-0"
              >
                <Calculator size={14} /> Simulador
              </button>
            )}
            
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Syne',sans-serif" }}>Edenred TaggyGreen</span>
        </div>
        <span className="text-xs">© 2026 Edenred EcoTag. Todos os direitos reservados.</span>
        <div className="flex gap-5 text-xs">
          {['Sustentabilidade', 'Termos', 'Privacidade'].map((label) => (
            <a key={label} href="#" className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function MetricCard({ icon, label, value, unit, change, changeDir = "up", bg = "bg-green-50" }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center text-xl mb-3`}>{icon}</div>
      <div className="text-xs text-gray-500 font-semibold mb-1">{label}</div>
      <div className="flex items-baseline flex-wrap gap-1">
        <span className="text-3xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>{value}</span>
        {unit && <span className="text-sm text-gray-400 font-semibold whitespace-nowrap">{unit}</span>}
      </div>
      {change && (
        <div className={`mt-2 text-xs font-semibold flex items-center gap-1 ${changeDir === "up" ? "text-green-600" : "text-red-500"}`}>
          <span>{changeDir === "up" ? "↑" : "↓"}</span> {change}
        </div>
      )}
    </div>
  );
}

export function Progress({ value, color = "bg-green-500" }) {
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }}></div>
    </div>
  );
}

export const OFFERS = [
  { id: 1, cat: "alimentacao", label: "Alimentação", title: "Mercado Orgânico", discount: "20% de Desconto", pts: 500, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80", color: "#16a34a" },
  { id: 2, cat: "alimentacao", label: "Alimentação", title: "Café Orgânico Matinal", discount: "Compre 1 Leve 2", pts: 300, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", color: "#16a34a" },
  { id: 3, cat: "alimentacao", label: "Alimentação", title: "Restaurante Vegano Roots", discount: "Prato 50% OFF", pts: 600, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80", color: "#16a34a" },
  { id: 4, cat: "mobilidade", label: "Mobilidade", title: "Estação Recarga EZ", discount: "R$ 15 em Crédito", pts: 800, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80", color: "#2563eb" },
  { id: 5, cat: "mobilidade", label: "Mobilidade", title: "Bikes Itaú / Tembici", discount: "1 Mês Grátis", pts: 1000, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", color: "#2563eb" },
  { id: 6, cat: "estilo", label: "Estilo de Vida", title: "Kit Produtos Ecológicos", discount: "15% de Desconto", pts: 450, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", color: "#7c3aed" },
  { id: 7, cat: "estilo", label: "Estilo de Vida", title: "Academia Verde", discount: "30 dias Grátis", pts: 700, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", color: "#7c3aed" },
  { id: 8, cat: "servicos", label: "Serviços", title: "Lavagem a Seco", discount: "R$ 10 OFF", pts: 350, img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80", color: "#d97706" },
];

export const CAT_COLORS = {
  alimentacao: "bg-green-100 text-green-800",
  mobilidade: "bg-blue-100 text-blue-800",
  estilo: "bg-purple-100 text-purple-800",
  servicos: "bg-amber-100 text-amber-800",
};

export function OfferCard({ offer, showBadge }) {
  const [resgated, setResgated] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="relative">
        <img src={offer.img} alt={offer.title} className="w-full h-36 object-cover" />
        {showBadge && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[offer.cat]}`}>
            {offer.label}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {!showBadge && <div className="text-xs text-gray-400 font-semibold mb-0.5">{offer.label}</div>}
        <div className="font-bold text-gray-900 text-sm mb-1">{offer.title}</div>
        <div className="font-bold text-green-600 text-sm mb-3">{offer.discount}</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-xs text-gray-400 flex items-center gap-1">Pts {offer.pts.toLocaleString()}</div>
          <button
            onClick={() => setResgated(!resgated)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${resgated ? "bg-gray-100 text-gray-500" : "bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-100"}`}
          >
            {resgated ? "Resgatado ✓" : "Resgatar"}
          </button>
        </div>
      </div>
    </div>
  );
}