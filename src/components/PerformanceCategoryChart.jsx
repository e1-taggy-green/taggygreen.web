import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

/**
 * Gráfico de Barras - Consumo por Categoria de Veículo
 * Exibe CO2 evitado por categoria com cores diferenciadas
 */
export function PerformanceCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center text-gray-400">Carregando dados de categoria...</div>
      </div>
    );
  }

  // Mapeia dados para o formato esperado pelo Recharts
  const chartData = data.map(item => ({
    name: item.categoria || item.name,
    "CO₂ Evitado (kg)": item.co2_evitado || item.co2_mitigado || 0,
    "Pedágios": item.pedagios || item.passages || 0,
    color: item.cor || item.color || "#10b981"
  }));

  // Identifica a categoria mais poluidora (maior CO2 evitado)
  const maxCO2Index = chartData.reduce((maxIdx, current, idx) => 
    (current["CO₂ Evitado (kg)"] > chartData[maxIdx]["CO₂ Evitado (kg)"]) ? idx : maxIdx
  , 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="font-bold text-gray-800 text-sm">Consumo de CO₂ por Categoria</div>
        <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">Abr/2026</span>
      </div>
      <div className="p-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                label={{ value: 'CO₂ Evitado (kg)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => value.toLocaleString('pt-BR')}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="CO₂ Evitado (kg)" fill="#10b981" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === maxCO2Index ? "#dc2626" : entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legenda explicativa */}
        <div className="mt-5 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl">
          <div className="text-xs font-bold text-red-800 mb-2">Categoria Mais Poluidora (Curada pela Plataforma)</div>
          <div className="text-sm text-red-700">
            <strong>{chartData[maxCO2Index]?.name}</strong> foi a categoria com maior CO₂ evitado ({chartData[maxCO2Index]?.["CO₂ Evitado (kg)"]?.toLocaleString('pt-BR')} kg), 
            representando o maior potencial de impacto ambiental reduzido pela TaggyGreen.
          </div>
        </div>
      </div>
    </div>
  );
}
