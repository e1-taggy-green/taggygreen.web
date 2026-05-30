import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Gráfico de Barras — Índice de Frota por Categoria
 * Conforme protótipo: duas barras agrupadas por categoria
 *   - CO₂ Evitado (kg) — verde
 *   - Combustível (L)  — azul
 * Sem destaque de "categoria mais poluidora"
 */
export function PerformanceCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center text-gray-400">
          Carregando dados de categoria...
        </div>
      </div>
    );
  }

  // Filtra apenas Carros e Caminhões conforme protótipo
  const filtered = data.filter((item) => {
    const name = (item.categoria || item.name || "").toLowerCase();
    return name.includes("carro") || name.includes("caminhão") || name.includes("caminhao") || name.includes("pesado");
  });

  // Normaliza os dados para o formato esperado
  const chartData = filtered.map((item) => ({
    name: item.categoria || item.name || "—",
    "CO₂ Evitado (kg)": item.co2_evitado ?? item.co2_mitigado ?? 0,
    "Combustível (L)": item.combustivel_litros ?? item.combustivel ?? Math.round((item.co2_evitado ?? item.co2_mitigado ?? 0) * 0.42),
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="font-bold text-gray-800 text-sm">
            Índice de Frota por Categoria
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            Acompanhe o desempenho das diferentes categorias de veículos da sua
            frota. Cada categoria mostra o CO₂ evitado e combustível
            economizado com o uso da Tag Edenred.
          </div>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full flex-shrink-0">
          Abr/2026
        </span>
      </div>
      <div className="p-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              barCategoryGap="30%"
              barGap={4}
              margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#d1d5db" }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [value.toLocaleString("pt-BR"), name]}
              />
              <Legend
                wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }}
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="CO₂ Evitado (kg)"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="Combustível (L)"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
