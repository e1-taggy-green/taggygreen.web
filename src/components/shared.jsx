import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, User, Building2, Calculator, Menu, X } from "lucide-react";

export function Logo({ size = "md", onClick }) {
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl" };
  const iconSizes = { sm: "w-7 h-7 text-sm", md: "w-9 h-9 text-lg", lg: "w-14 h-14 text-2xl" };
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 focus:outline-none">
      <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg shadow-green-200 flex-shrink-0`}>
        <Leaf className="text-white" size={size === "sm" ? 16 : size === "md" ? 20 : 32} />
      </div>
      <span className={`${sizes[size]} font-black tracking-tight`} style={{ fontFamily: "'Syne',sans-serif" }}>
        Edenred <span className="text-green-600">TaggyGreen</span>
      </span>
    </button>
  );
}

export function Nav({ activePage, showB2bB2c = true }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Portal B2C",  icon: <User size={16} />,       path: "/b2c/hub",        page: "b2c",       outline: false },
    { label: "Gestão B2B",  icon: <Building2 size={16} />,  path: "/b2b/dashboard",  page: "b2b",       outline: false },
    { label: "Simulador",   icon: <Calculator size={16} />, path: "/b2b/simulador",  page: "simulador", outline: true  },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Logo size="md" onClick={() => { navigate("/"); setMenuOpen(false); }} />

        {/* Desktop nav */}
        {showB2bB2c && (
          <div className="hidden sm:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  item.outline
                    ? "border-2 border-green-500 text-green-700 hover:bg-green-50"
                    : activePage === item.page
                    ? "bg-green-500 text-white shadow-md shadow-green-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Mobile hamburguer */}
        {showB2bB2c && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {showB2bB2c && menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => { navigate(item.path); setMenuOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full text-left ${
                item.outline
                  ? "border-2 border-green-500 text-green-700"
                  : activePage === item.page
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
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
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>{value}</span>
        {unit && <span className="text-base text-gray-400 font-semibold">{unit}</span>}
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

