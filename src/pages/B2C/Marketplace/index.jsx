import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, OFFERS, CAT_COLORS, OfferCard } from "../../../components/shared";
import { Coins, ShoppingBag, Lightbulb } from "lucide-react";
import { b2cService } from "../../../services/b2cService";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [filterCat, setFilterCat] = useState("all");
  const [userPoints, setUserPoints] = useState(null);

  useEffect(() => {
    b2cService.getUser()
      .then((res) => setUserPoints(res.data?.userPoints ?? null))
      .catch(() => {});
  }, []);

  const filteredOffers = filterCat === "all" ? OFFERS : OFFERS.filter(o => o.cat === filterCat);

  const TABS = [
    { id: "meu-rastro",  label: "Meu Rastro Verde",  path: "/b2c/hub"         },
    { id: "resumo",      label: "Resumo",             path: "/b2c/hub"         },
    { id: "marketplace", label: "Marketplace Verde",  path: "/b2c/marketplace" },
    { id: "historico",   label: "Histórico",          path: "/b2c/hub"         },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      {/* HEADER com as mesmas tabs do Hub */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Marketplace Verde
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Troque seus pontos de carbono em benefícios exclusivos</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-5 py-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-xl font-black text-green-700" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {userPoints != null ? `${userPoints.toLocaleString("pt-BR")} pts` : "— pts"}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs — igual ao Hub */}
          <div className="flex gap-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(t.path)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                  t.id === "marketplace"
                    ? "border-green-500 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Ofertas Exclusivas</div>
            <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>Explore todas as ofertas</h2>
            <p className="text-sm text-gray-500">Cada oferta tem um custo em pontos de carbono. Quanto mais sustentável você for, mais pontos acumula!</p>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap mb-6">
            {[
              { id: "all",        label: "Todos"         },
              { id: "alimentacao",label: "Alimentação"   },
              { id: "mobilidade", label: "Mobilidade"    },
              { id: "estilo",     label: "Estilo de Vida"},
              { id: "servicos",   label: "Serviços"      },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterCat(f.id)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                  filterCat === f.id
                    ? "bg-green-500 text-white border-green-500 shadow-md shadow-green-100"
                    : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOffers.map(o => <OfferCard key={o.id} offer={o} showBadge />)}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
              <div className="text-lg font-black text-gray-900 mb-2">Nenhuma oferta nesta categoria</div>
              <p className="text-gray-500">Tente selecionar outra categoria</p>
            </div>
          )}

          <div className="mt-8 bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-5 flex items-start gap-3">
            <Lightbulb size={24} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-bold text-green-800 text-sm mb-1">Como funciona?</div>
              <div className="text-xs text-green-700 leading-relaxed">
                Cada vez que você utiliza sua Tag Edenred em pedágios, você acumula pontos de carbono.
                Esses pontos podem ser resgatados por descontos em nossas marcas parceiras.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
