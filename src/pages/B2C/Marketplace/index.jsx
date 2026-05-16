import { useState } from "react";
import { Nav, Footer, OFFERS, CAT_COLORS, OfferCard } from "../../../components/shared";

/**
 * MARKETPLACE PAGE
 * Página de marketplace do portal B2C
 * Usuário pode filtrar ofertas por categoria e resgatar pontos de carbono
 */
export default function MarketplacePage() {
  const [filterCat, setFilterCat] = useState("all");

  const filteredOffers = filterCat === "all" ? OFFERS : OFFERS.filter(o => o.cat === filterCat);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-6">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Marketplace Verde</h1>
              <p className="text-sm text-gray-500 mt-0.5">Troque seus pontos de carbono em benefícios exclusivos</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-5 py-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl"></div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-xl font-black text-green-700" style={{fontFamily:"'Syne',sans-serif"}}>1.250 pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto">
          {/* INFO */}
          <div className="mb-6">
            <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">🛍️ Ofertas Exclusivas</div>
            <h2 className="text-xl font-black text-gray-900 mb-1" style={{fontFamily:"'Syne',sans-serif"}}>Explore todas as ofertas</h2>
            <p className="text-sm text-gray-500">Cada oferta tem um custo em pontos de carbono. Quanto mais sustentável você for, mais pontos acumula!</p>
          </div>

          {/* FILTROS */}
          <div className="flex gap-2 flex-wrap mb-6">
            {[{id:"all",label:"Todos"},{id:"alimentacao",label:" Alimentação"},{id:"mobilidade",label:" Mobilidade"},{id:"estilo",label:" Estilo de Vida"},{id:"servicos",label:" Serviços"}].map(f => (
              <button key={f.id} onClick={() => setFilterCat(f.id)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${filterCat===f.id?"bg-green-500 text-white border-green-500 shadow-md shadow-green-100":"border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* GRID DE OFERTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOffers.map(o => <OfferCard key={o.id} offer={o} showBadge/>)}
          </div>

          {/* EMPTY STATE */}
          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4"></div>
              <div className="text-lg font-black text-gray-900 mb-2">Nenhuma oferta nesta categoria</div>
              <p className="text-gray-500">Tente selecionar outra categoria</p>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-8 bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">💡</span>
            <div>
              <div className="font-bold text-green-800 text-sm mb-1">Como funciona?</div>
              <div className="text-xs text-green-700 leading-relaxed">
                Cada vez que você utiliza sua Tag Edenred em pedágios e postos, você acumula pontos de carbono. 
                Esses pontos podem ser resgatados por descontos em nossas marcas parceiras. Quanto mais você 
                economiza CO₂, mais benefícios consegue!
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
