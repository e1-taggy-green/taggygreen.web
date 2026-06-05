import { useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { b2bService } from "../services/b2bService";

export function useExportReport({ showSpinner, hideSpinner } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPDF = async () => {
    try {
      setLoading(true);
      setError(null);
      if (showSpinner) showSpinner("Gerando relatório PDF...");

      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Relatório Executivo ESG", 14, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("TaggyGreen & Edenred - Impacto e Performance de Frota", 14, 28);
      doc.text(`Data de Referência: ${new Date().toLocaleDateString("pt-BR")}`, 14, 33);

      doc.setDrawColor(34, 197, 94);
      doc.setLineWidth(1);
      doc.line(14, 38, pageWidth - 14, 38);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("1. Resumo de Sustentabilidade", 14, 50);

      autoTable(doc, {
        startY: 55,
        theme: "grid",
        headStyles: { fillColor: [34, 197, 94] },
        head: [["Indicador", "Valor", "Unidade", "Detalhe (GHG Protocol)"]],
        body: [
          ["CO2 Evitado", "4.375", "kg", "Certificado Escopo 1 e 3"],
          ["Combustível Poupado", "1.470", "L", "Certificado"],
          ["Tempo Otimizado", "142", "hrs", "+5% eficiência de rotas"],
          ["Economia Financeira", "18.450", "R$", "ROI Auditável: 285%"],
        ],
      });

      let finalY = doc.lastAutoTable.finalY + 15;
      const chartElement = document.getElementById("pdf-chart-container");

      if (chartElement) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("2. Performance por Categoria (Gráfico)", 14, finalY);

        const chartImg = await toPng(chartElement, { backgroundColor: "#ffffff", pixelRatio: 2 });
        const imgWidth = pageWidth - 28;
        const imgHeight = imgWidth / 2;
        doc.addImage(chartImg, "PNG", 14, finalY + 5, imgWidth, imgHeight);
        finalY = finalY + imgHeight + 20;
      }

      // 3. Detalhamento — apenas Carros e Caminhões
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("3. Detalhamento Operacional", 14, finalY);

      autoTable(doc, {
        startY: finalY + 5,
        theme: "striped",
        headStyles: { fillColor: [59, 130, 246] },
        head: [["Categoria", "Veículos", "Passagens", "CO2 Evitado"]],
        body: [
          ["Carros", "620", "4.820", "2.140 kg"],
          ["Caminhões", "240", "1.230", "1.850 kg"],
        ],
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("Este documento consolida os resultados de impacto sustentável auditáveis via GHG Protocol.", 14, 285);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - 25, 285);
      }

      const timestamp = new Date().toISOString().slice(0, 10);
      doc.save(`Relatorio-Oficial-ESG-${timestamp}.pdf`);
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
      setError("Falha ao gerar relatório PDF.");
    } finally {
      setLoading(false);
      if (hideSpinner) hideSpinner();
    }
  };

  const exportCSV = async () => {
    try {
      setLoading(true);
      setError(null);
      if (showSpinner) showSpinner("Exportando CSV...");

      // Chama a API real para gerar o CSV com dados do banco
      const email = 'teste.b2b@taggy.com';
      const response = await b2bService.getRelatorioESG_csv(email);

      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadFile(blob, `Relatorio-TaggyGreen-Frota-${timestamp}.csv`);
    } catch (err) {
      console.error("Erro ao exportar CSV:", err);
      setError("Falha ao gerar relatório CSV neste momento. Tente novamente.");
    } finally {
      setLoading(false);
      if (hideSpinner) hideSpinner();
    }
  };

  return { exportPDF, exportCSV, loading, error, clearError: () => setError(null) };
}
