import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer } from "../../../components/shared";
import { Coins, ShoppingBag, Lightbulb } from "lucide-react";
import { b2cService } from "../../../services/b2cService";
import { useUser } from "../../../contexts/UserContext";
import { useToast } from "../../../contexts/ToastContext";

const CATEGORIAS = [
  { id: "all",         label: "Todos"         },
  { id: "alimentacao", label: "Alimentação"   },
  { id: "mobilidade",  label: "Mobilidade"    },
  { id: "estilo",      label: "Estilo de Vida"},
  { id: "servicos",    label: "Serviços"      },
];

// Mapeamento de ID do produto → categoria.
// Baseado no seed do backend. Atualizar se novos produtos forem adicionados.
const CATEGORIA_POR_ID = {
  1:  "alimentacao", // Voucher iFood R$25
  2:  "mobilidade",  // Crédito Uber R$10
  3:  "estilo",      // Ingresso Cinemark
  4:  "servicos",    // Doação para Projeto de Reflorestamento
  5:  "estilo",      // 1 Mês de Spotify Premium
  6:  "mobilidade",  // Desconto de 10% em Postos Shell
  7:  "servicos",    // Lavagem Ecológica de Veículo
  8:  "servicos",    // Crédito de Celular R$15
  9:  "estilo",      // Assinatura de E-book sobre Sustentabilidade
  10: "estilo",      // Kit de Canudos de Inox
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-100" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-8 bg-gray-100 rounded mt-3" />
      </div>
    </div>
  );
}

function ProdutoCard({ produto, onResgatar, resgatando }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Imagem do produto resolvida pelo ID */}
      <div className="h-40 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img
          src={`/produtos/${produto.id}.jpeg`}
          alt={produto.nome}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{produto.nome}</h3>
        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-3">
            <Coins size={14} className="text-green-600" />
            <span className="text-sm font-black text-green-700">
              {(produto.pontos_custo ?? 0).toLocaleString("pt-BR")} pts
            </span>
          </div>
          <button
            onClick={() => onResgatar(produto)}
            disabled={resgatando}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
          >
            {resgatando ? "Resgatando..." : "Resgatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { userEmail, userPoints, atualizarSaldo } = useUser();
  const { addToast } = useToast();

  const [produtos, setProdutos]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [page, setPage]               = useState(1);
  const [total, setTotal]             = useState(0);
  const [filtro, setFiltro]           = useState("all");
  const [resgatando, setResgatando]   = useState(null); // product_id sendo resgatado

  const SIZE = 9;

  const fetchProdutos = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await b2cService.getProdutosMP(p, SIZE);
      setProdutos(res.data?.items ?? []);
      setTotal(res.data?.total ?? 0);
      setPage(p);
    } catch {
      // erro já tratado pelo interceptador global
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProdutos(1); }, [fetchProdutos]);

  const handleResgatar = async (produto) => {
    if (!userEmail) {
      addToast("Usuário não identificado. Tente recarregar a página.", "error");
      return;
    }

    const custo = produto.pontos_custo ?? 0;

    setResgatando(produto.id);
    try {
      const res = await b2cService.resgatar(userEmail, produto.id);
      // Backend retorna o saldo ABSOLUTO já atualizado.
      atualizarSaldo(res.data?.saldo_atualizado);
      addToast(`Resgate realizado! Você usou ${custo.toLocaleString("pt-BR")} pontos.`, "success");
    } catch (err) {
      const status = err?.response?.status;
      if (status === 422 || status === 400) {
        addToast("Você ainda não mitigou carbono suficiente para essa recompensa. Continue usando a Taggy!", "error", 6000);
      }
      // outros erros já tratados pelo interceptador global
    } finally {
      setResgatando(null);
    }
  };

  const TABS = [
    { id: "meu-rastro",  label: "Meu Rastro Verde",  path: "/b2c/hub"         },
    { id: "marketplace", label: "Marketplace Verde",  path: "/b2c/marketplace" },
  ];

  const totalPages = Math.ceil(total / SIZE);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Marketplace Verde
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Troque seus pontos de carbono em benefícios exclusivos</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 w-full sm:w-auto">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coins size={22} className="text-green-600" />
              </div>
              <div className="flex-1 sm:flex-none">
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-lg sm:text-xl font-black text-green-700" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {userPoints != null ? `${userPoints.toLocaleString("pt-BR")} pts` : "— pts"}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(t.path)}
                className={`px-4 sm:px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${
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
      <div className="flex-1 bg-gray-50 px-4 sm:px-6 py-5 sm:py-7">
        <div className="max-w-6xl mx-auto">

          <div className="mb-5">
            <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Ofertas Exclusivas</div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
              Explore todas as ofertas
            </h2>
            <p className="text-sm text-gray-500">Cada oferta tem um custo em pontos de carbono. Quanto mais sustentável você for, mais pontos acumula!</p>
          </div>

          {/* Filtros de categoria */}
          <div className="flex gap-2 flex-wrap mb-5">
            {CATEGORIAS.map((c) => (
              <button
                key={c.id}
                onClick={() => setFiltro(c.id)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                  filtro === c.id
                    ? "bg-green-500 text-white border-green-500 shadow-md shadow-green-100"
                    : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700 bg-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid de produtos */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : produtos.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
              <div className="text-lg font-black text-gray-900 mb-2">Nenhuma oferta disponível</div>
              <p className="text-gray-500 text-sm">Volte em breve para novas recompensas!</p>
            </div>
          ) : (() => {
            const filtrados = filtro === "all"
              ? produtos
              : produtos.filter((p) => CATEGORIA_POR_ID[p.id] === filtro);
            return filtrados.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                <div className="text-lg font-black text-gray-900 mb-2">Nenhuma oferta nesta categoria</div>
                <p className="text-gray-500 text-sm">Tente outro filtro ou veja todas as ofertas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtrados.map((p) => (
                  <ProdutoCard
                    key={p.id}
                    produto={p}
                    onResgatar={handleResgatar}
                    resgatando={resgatando === p.id}
                  />
                ))}
              </div>
            );
          })()}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => fetchProdutos(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-40 hover:border-green-500 hover:text-green-700 transition-all"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-500 font-semibold px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => fetchProdutos(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-40 hover:border-green-500 hover:text-green-700 transition-all"
              >
                Próxima
              </button>
            </div>
          )}

          {/* Dica */}
          <div className="mt-6 sm:mt-8 bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <Lightbulb size={22} className="text-green-600 mt-0.5 flex-shrink-0" />
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