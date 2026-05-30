/**
 * Ranking da Frota — fiel ao protótipo B2B Performance
 * - 1º lugar: ícone troféu SVG amarelo
 * - 2º-5º: ícone carro SVG cinza
 * - Placa em negrito + motorista em verde
 * - Passagens (Pedágio/Estacionamento) centralizado
 * - Emissões: badge verde no 1º, texto cinza nos demais
 * - Sem emojis
 */

function TrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2h12v8a6 6 0 01-12 0V2z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2"/>
      <path d="M6 5H3a2 2 0 000 4h3M18 5h3a2 2 0 010 4h-3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M9 17v-1a3 3 0 003-3 3 3 0 003 3v1" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="8" y="17" width="8" height="2" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2"/>
      <rect x="7" y="19" width="10" height="2" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2"/>
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="2" y="11" width="20" height="7" rx="2" stroke="#9CA3AF" strokeWidth="1.5"/>
      <circle cx="7" cy="18" r="2" fill="white" stroke="#9CA3AF" strokeWidth="1.5"/>
      <circle cx="17" cy="18" r="2" fill="white" stroke="#9CA3AF" strokeWidth="1.5"/>
      <path d="M2 14h20" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  );
}

export function PerformanceDataGrid({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="text-center text-gray-400">
          Carregando dados de ranking...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Título */}
      <div className="px-6 pt-5 pb-3">
        <div className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Syne',sans-serif" }}>
          Ranking da Frota
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          Ranking de eficiência dos veículos da frota que utilizam TaggyGreen.
        </div>
      </div>

      {/* Header das colunas */}
      <div className="grid grid-cols-12 gap-2 px-6 py-2.5 border-t border-b border-gray-100 bg-gray-50">
        <div className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Placa / Motorista
        </div>
        <div className="col-span-4 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">
          Passagens (Pedágio/Estacionamento)
        </div>
        <div className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wide text-right">
          Emissões Evitadas (kg CO₂)
        </div>
      </div>

      {/* Linhas */}
      <div className="divide-y divide-gray-50">
        {data.map((vehicle, idx) => {
          const rank = vehicle.rank || idx + 1;
          const passagens =
            vehicle.pedagios ?? vehicle.passagens ?? vehicle.transacoes ?? 0;
          const co2 =
            vehicle.co2_mitigado ?? vehicle.co2_evitado_kg ?? vehicle.co2 ?? 0;
          const placa = vehicle.placa || "—";
          const motorista = vehicle.motorista || vehicle.modelo || "";
          const isFirst = rank === 1;

          return (
            <div
              key={placa + idx}
              className="grid grid-cols-12 gap-2 px-6 py-3.5 items-center hover:bg-gray-50 transition-colors"
            >
              {/* Ícone + Placa + Motorista */}
              <div className="col-span-5 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isFirst ? "bg-amber-50" : "bg-gray-100"
                  }`}
                >
                  {isFirst ? <TrophyIcon /> : <CarIcon />}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{placa}</div>
                  {motorista && (
                    <div className="text-xs text-green-600 font-medium mt-0.5">
                      {motorista}
                    </div>
                  )}
                </div>
              </div>

              {/* Passagens */}
              <div className="col-span-4 text-center">
                <span className="text-sm font-semibold text-gray-700">
                  {passagens.toLocaleString("pt-BR")}
                </span>
              </div>

              {/* Emissões */}
              <div className="col-span-3 text-right">
                {isFirst ? (
                  <span className="inline-block text-xs font-bold text-green-700 bg-green-100 rounded-full px-3 py-1">
                    -{co2.toLocaleString("pt-BR")} kg
                  </span>
                ) : (
                  <span className="text-sm text-gray-500 font-medium">
                    -{co2.toLocaleString("pt-BR")} kg
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
