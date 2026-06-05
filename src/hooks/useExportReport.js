import { useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { b2bService } from "../services/b2bService";

/**
 * Custom Hook para gerenciar exportação de relatórios
 * Handles: PDF e CSV downloads diretamente no Front-end
 */
export function useExportReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadFile = (blob, filename) => {
    // Cria uma URL para o blob
    const url = URL.createObjectURL(blob);
    
    // Cria um elemento anchor temporário
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    // Adiciona ao DOM, clica e remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpa a URL do blob
    URL.revokeObjectURL(url);
  };

   // Gera um documento PDF nativo e formal
  const exportPDF = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Cria o documento PDF do zero (Nativo A4)
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();

      // 2. Títulos e Textos Formais Corporativos
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Relatório Executivo ESG", 14, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("TaggyGreen & Edenred - Impacto e Performance de Frota", 14, 28);
      doc.text(`Data de Referência: ${new Date().toLocaleDateString("pt-BR")}`, 14, 33);

      doc.setDrawColor(34, 197, 94); // Linha verde padrão TaggyGreen
      doc.setLineWidth(1);
      doc.line(14, 38, pageWidth - 14, 38);

      // 3. Tabela de Sustentabilidade
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("1. Resumo de Sustentabilidade", 14, 50);

      autoTable(doc, {
        startY: 55,
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94] },
        head: [['Indicador', 'Valor', 'Unidade', 'Detalhe (GHG Protocol)']],
        body: [
          ['CO2 Evitado', '4.375', 'kg', 'Certificado Escopo 1 e 3'],
          ['Combustível Poupado', '1.470', 'L', 'Certificado'],
          ['Tempo Otimizado', '142', 'hrs', '+5% eficiência de rotas'],
          ['Economia Financeira', '18.450', 'R$', 'ROI Auditável: 285%']
        ],
      });

      // 4. Captura e Inserção do Gráfico
      let finalY = doc.lastAutoTable.finalY + 15;
      const chartElement = document.getElementById("pdf-chart-container");
      
      if (chartElement) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("2. Performance por Categoria (Gráfico)", 14, finalY);

        // Transforma APENAS o gráfico em imagem para inserir no documento
        const chartImg = await toPng(chartElement, { backgroundColor: "#ffffff", pixelRatio: 2 });
        
        // Desenha a imagem no PDF preservando a proporção de 700x350 (2:1)
        const imgWidth = pageWidth - 28;
        const imgHeight = imgWidth / 2; 
        doc.addImage(chartImg, "PNG", 14, finalY + 5, imgWidth, imgHeight);
        
        finalY = finalY + imgHeight + 20;
      }

      // 5. Tabela de Detalhamento
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("3. Detalhamento Operacional", 14, finalY);

      autoTable(doc, {
        startY: finalY + 5,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] },
        head: [['Categoria', 'Veículos', 'Passagens', 'CO2 Evitado']],
        body: [
          ['Carros e Utilitários', '620', '4.820', '2.140 kg'],
          ['Caminhões e Pesados', '240', '1.230', '1.850 kg'],
          ['Motos', '100', '980', '385 kg'],
          ['Vans e Kombis', '40', '170', '280 kg']
        ],
      });

      // 6. Rodapé Padrão
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("Este documento consolida os resultados de impacto sustentável auditáveis via GHG Protocol.", 14, 285);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - 25, 285);
      }

      // 7. Download
      const timestamp = new Date().toISOString().slice(0, 10);
      doc.save(`Relatorio-Oficial-ESG-${timestamp}.pdf`);
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
      setError("Falha ao gerar relatório PDF.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chama a API real para gerar o CSV com dados do banco
      const email = 'teste.b2b@taggy.com';
      const response = await b2bService.getRelatorioESG_csv(email);

      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `Relatorio-TaggyGreen-Frota-${timestamp}.csv`;

      downloadFile(blob, filename);
    } catch (err) {
      console.error("Erro ao exportar CSV:", err);
      setError("Falha ao gerar relatório CSV neste momento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    exportPDF,
    exportCSV,
    loading,
    error,
    clearError: () => setError(null),
  };
}
