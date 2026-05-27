import { useMemo } from "react";

// Constante de mercado: 15 kg CO₂ = 1 árvore absorvida por ano
export const FATOR_ARVORE = 15;

const MICRO_FAIXAS = [
  { min: 10, icone: "🌿", msg: (kg) => `Você ajudou a limpar o ar de ${Math.ceil(kg / 0.8)} quadras` },
  { min: 5,  icone: "🍃", msg: () => "Você compensou o equivalente a 500 respirações limpas" },
  { min: 1,  icone: "🌬️", msg: () => "Cada pedágio conta! Sua pegada está diminuindo" },
  { min: 0,  icone: "🌱", msg: () => "Sua jornada verde está prestes a começar!" },
];

/**
 * Converte kg CO₂ em equivalência de árvores.
 * Usa Math.floor — descarta restos, sem arredondar para cima.
 *
 * calcularEquivalencia(30.2) → { arvores: 2, restoKg: 0.2, ... }
 * calcularEquivalencia(2.0)  → { arvores: 0, restoKg: 2.0, ... }
 */
export function calcularEquivalencia(totalKg) {
  const arvores = Math.floor(totalKg / FATOR_ARVORE);
  const restoKg = parseFloat((totalKg % FATOR_ARVORE).toFixed(1));

  if (arvores >= 1) {
    return {
      arvores,
      restoKg,
      icone: arvores >= 5 ? "🌳" : "🌲",
      mensagem:
        `Você mitigou o equivalente a ${arvores} ` +
        `${arvores === 1 ? "Árvore plantada" : "Árvores plantadas"} esse ano!`,
    };
  }

  const faixa = MICRO_FAIXAS.find((f) => totalKg >= f.min) ?? MICRO_FAIXAS.at(-1);
  return {
    arvores: 0,
    restoKg: totalKg,
    icone: faixa.icone,
    mensagem: faixa.msg(totalKg),
  };
}

function ProximaArvore({ restoKg }) {
  const pct = Math.min((restoKg / FATOR_ARVORE) * 100, 100);
  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span className="font-semibold">Próxima árvore</span>
        <span>{restoKg.toFixed(1).replace(".", ",")} / {FATOR_ARVORE} kg</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ArvoresVisuais({ quantidade }) {
  if (quantidade === 0) return null;
  const exibir = Math.min(quantidade, 20);
  const icone  = quantidade >= 5 ? "🌳" : "🌲";

  return (
    <div className="flex flex-wrap justify-center gap-1.5 mt-4">
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.3); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
      {Array.from({ length: exibir }).map((_, i) => (
        <span
          key={i}
          className="text-3xl"
          style={{ animation: "popIn 0.35s ease both", animationDelay: `${i * 55}ms` }}
        >
          {icone}
        </span>
      ))}
      {quantidade > 20 && (
        <span className="text-green-600 font-black text-sm self-end ml-1">
          +{quantidade - 20}
        </span>
      )}
    </div>
  );
}

/**
 * Props:
 *   totalKgCO2: number — total bruto vindo do hook useRastroVerde
 */
export default function GamificacaoEngine({ totalKgCO2 = 0 }) {
  const equiv = useMemo(() => calcularEquivalencia(totalKgCO2), [totalKgCO2]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <div className="text-5xl mb-2">{equiv.icone}</div>
      <p
        className="font-black text-green-900 leading-tight"
        style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem" }}
      >
        {equiv.mensagem}
      </p>
      <p className="text-green-600 text-xs mt-1 font-semibold">
        {totalKgCO2.toFixed(1).replace(".", ",")} kg CO₂ mitigados no período
      </p>
      <ArvoresVisuais quantidade={equiv.arvores} />
      <ProximaArvore restoKg={equiv.restoKg} />
    </div>
  );
}
