import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const MESES_ABREV = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
function getMesAtualAbrev() {
  const agora = new Date();
  return `${MESES_ABREV[agora.getMonth()]}/${agora.getFullYear()}`;
}

export function PerformanceCategoryChart({ data }) {
  const [filtro, setFiltro] = useState("todos");

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center text-gray-400">Carregando dados de categoria...</div>
      </div>
    );
  }

  const categorizar = (item) => {
    const cat = (item.categoria || item.name || "").trim();
    if (cat === "Carro" || cat === "Carros") return "carro";
    if (cat === "Caminhão" || cat === "Caminhao" || cat === "Caminhões") return "caminhao";
    return "outro";
  };

  const chartData = data
    .filter((item) => {
      const tipo = categorizar(item);
      if (filtro === "todos")    return tipo === "carro" || tipo === "caminhao";
      if (filtro === "carro")    return tipo === "carro";
      if (filtro === "caminhao") return tipo === "caminhao";
      return false;
    })
    .map((item) => ({
      name: (item.categoria || item.name || "—").trim(),
      "CO₂ Evitado (kg)": parseFloat(item.co2_evitado_kg)            || 0,
      "Combustível (L)":  parseFloat(item.combustivel_evitado_litros) || 0,
    }));

  const FILTROS = [
    { id: "todos",    label: "Todos"    },
    { id: "carro",    label: "Carro"    },
    { id: "caminhao", label: "Caminhão" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="font-bold text-gray-800 text-sm">Índice de Frota por Categoria</div>
          <div className="text-xs text-gray-400 mt-0.5">
            CO₂ evitado e combustível economizado com o uso da Tag Edenred.
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                filtro === f.id
                  ? "bg-green-500 text-white shadow-sm shadow-green-100"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">
            {getMesAtualAbrev()}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div style={{ width: "100%", height: 290 }}>
          <ResponsiveContainer width="100%" height={290}>
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
              <Bar dataKey="CO₂ Evitado (kg)" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Combustível (L)"  fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}