import { Progress } from "./shared";

/**
 * DataGrid - Tabela interativa com ranking dos Top 5 veículos
 * Exibe: Placa, Total de Pedágios convertidos, CO2 Mitigado
 */
export function PerformanceDataGrid({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center text-gray-400">Carregando dados de ranking...</div>
      </div>
    );
  }

  // Calcula o máximo de CO2 para normalizar a barra de progresso
  const maxCO2 = Math.max(...data.map(v => v.co2_mitigado || 0));

  const medalColors = {
    1: "bg-gradient-to-br from-yellow-300 to-yellow-500 text-white",
    2: "bg-gradient-to-br from-gray-300 to-gray-400 text-white",
    3: "bg-gradient-to-br from-orange-300 to-orange-500 text-white",
  };

  const getMedalIcon = (rank) => {
    const medals = { 1: "1", 2: "2", 3: "3" };
    return medals[rank] || rank;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="font-bold text-gray-800 text-sm">
          Top 5 Veículos do Ranking
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">
          Abr/2026
        </span>
      </div>

      {/* Header da Tabela */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
        <div className="col-span-1">Pos</div>
        <div className="col-span-4">Veículo</div>
        <div className="col-span-3">Pedágios</div>
        <div className="col-span-4">CO₂ Mitigado</div>
      </div>

      {/* Linhas da Tabela */}
      <div className="divide-y divide-gray-50">
        {data.map((vehicle, idx) => {
          const rank = vehicle.rank || idx + 1;
          const co2Percentage = maxCO2 > 0 ? (vehicle.co2_mitigado / maxCO2) * 100 : 0;

          return (
            <div
              key={vehicle.placa || idx}
              className="px-5 py-4 hover:bg-gray-50 transition-colors duration-150 flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-4 sm:items-center"
            >
              {/* Posição/Medalha */}
              <div className="col-span-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    medalColors[rank] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getMedalIcon(rank)}
                </div>
              </div>

              {/* Informações do Veículo */}
              <div className="col-span-4">
                <div className="font-bold text-sm text-gray-800">
                  {vehicle.placa}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {vehicle.modelo || "Modelo não especificado"}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  📍 {vehicle.rota || "Rota não especificada"}
                </div>
              </div>

              {/* Total Pedágios */}
              <div className="col-span-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-gray-900">
                    {(vehicle.pedagios || 0).toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs text-gray-400">conversões</span>
                </div>
              </div>

              {/* CO2 Mitigado com barra de progresso */}
              <div className="col-span-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-green-600">
                      +{(vehicle.co2_mitigado || 0).toLocaleString("pt-BR")} kg
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {co2Percentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={co2Percentage} color="bg-green-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer com estatísticas */}
      <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="text-gray-500 font-semibold mb-1">Total CO₂ Mitigado</div>
            <div className="text-lg font-black text-green-700">
              +{data.reduce((sum, v) => sum + (v.co2_mitigado || 0), 0).toLocaleString("pt-BR")} kg
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold mb-1">Total Pedágios</div>
            <div className="text-lg font-black text-blue-700">
              {data.reduce((sum, v) => sum + (v.pedagios || 0), 0).toLocaleString("pt-BR")}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-gray-500 font-semibold mb-1">Média CO₂/Veículo</div>
            <div className="text-lg font-black text-amber-700">
              +{Math.round(data.reduce((sum, v) => sum + (v.co2_mitigado || 0), 0) / data.length).toLocaleString("pt-BR")} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
