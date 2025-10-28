import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDFExport() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const preview = document.getElementById('preview');
    if (!preview) return;

    try {
      setLoading(true);

      // Make sure everything inside #preview is fully visible
      window.scrollTo(0, 0);

      const canvas = await html2canvas(preview, {
        scale: 2, // Higher scale = sharper PDF
        useCORS: true, // Allow cross-origin images
        logging: false, // Disable console logs from html2canvas
        backgroundColor: '#ffffff', // Ensures white background
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      // Handle long resumes (multi-page)
      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = -pdfHeight;
        }
      }

      pdf.save('resume.pdf');
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      } text-white px-4 py-2 rounded transition`}
    >
      {loading ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}
