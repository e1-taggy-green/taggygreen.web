import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, FileText, Download, CheckCircle } from 'lucide-react';

export default function DashboardB2B() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-taggy-light p-6 font-sans text-taggy-dark">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Corporativo */}
        <header className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-edenred-orange">
              <ArrowLeft size={24} />
            </button>
            <div>
              <span className="text-xs font-bold text-edenred-orange bg-orange-50 px-2 py-1 rounded mb-2 inline-block">Painel Corporativo</span>
              <h1 className="text-2xl font-bold">Gestão de Frotas e ESG</h1>
              <p className="text-sm text-gray-500">Acompanhe a eficiência da sua frota e gere relatórios auditáveis.</p>
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 font-semibold mb-1">FROTA TOTAL</p>
              <p className="text-xl font-bold">1000</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
              <p className="text-xs text-edenred-orange font-semibold mb-1">COM TAG</p>
              <p className="text-xl font-bold text-edenred-orange">350</p>
            </div>
          </div>
        </header>

        {/* Área de Exportação e Resumo */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Exportação */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-2">Exportação de Relatório ESG</h2>
            <p className="text-gray-500 mb-6 max-w-lg">
              Baixe os cálculos auditáveis de emissões evitadas pela sua frota. Estes dados seguem os padrões GHG Protocol.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-6">
              <CheckCircle className="text-blue-500 shrink-0" size={20} />
              <p className="text-sm text-blue-900">
                <strong>Dados Certificados:</strong> O cálculo considera a redução de tempo ocioso em praças de pedágio. Foram evitados <strong>4.375 kg de CO₂</strong> este mês.
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-taggy-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-all">
                <FileText size={20} />
                Baixar PDF Auditável
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                <Download size={20} />
                Exportar CSV
              </button>
            </div>
          </div>

          {/* Resumo Rápido */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Resumo do Período</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>CO₂ Evitado</span>
                  <span>4.375 kg</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-taggy-green h-2 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Combustível Poupado</span>
                  <span>1.470 L</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Tempo Otimizado</span>
                  <span>142 hrs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-edenred-orange h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}