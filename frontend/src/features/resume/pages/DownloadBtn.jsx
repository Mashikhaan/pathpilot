import React from "react";
import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useUpdateCoin } from "../../auth/hooks/useCoin";

const DownloadBtn = ({ docsRef, user }) => {
  const { handleUseCoin } = useUpdateCoin();

  const handlePdf = useReactToPrint({
    contentRef: docsRef,
    documentTitle: "PathPilotPDF",

    pageStyle: `
      @page {
        size: A4;
        margin: 12mm;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      @media print {
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        body {
          margin: 0;
          padding: 0;
        }

        /*
         * Major report cards should stay together.
         * If a card doesn't fit on the remaining page,
         * browser will move the complete card to the next page.
         */
        .report-card {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }

        /*
         * Keep the question's main content together.
         */
        .question-main {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }

        /*
         * Improvements are allowed to continue naturally
         * if they become too long.
         */
        .question-improvements {
          break-inside: auto !important;
          page-break-inside: auto !important;
        }

        .question-section {
          break-inside: auto !important;
          page-break-inside: auto !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
      }
    `,
  });

  const handleDownload = async () => {
    try {
      // First verify/deduct coins.
      // PDF will NOT be printed if this fails.
      await handleUseCoin(20, "resume-download");

      // Print only after successful coin deduction.
      await handlePdf();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center gap-1.5 rounded-lg bg-black text-white px-3 py-2 sm:px-3 text-xs cursor-pointer"
    >
      <FiDownload />
      Download PDF
    </button>
  );
};

export default DownloadBtn;
