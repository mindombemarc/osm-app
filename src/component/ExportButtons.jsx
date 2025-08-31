import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableComponent from "./PrintableComponent";

const ExportButtons = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Liste_Bureaux",
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Boutons Export */}
      <div className="flex gap-3">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Export CSV
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Export Excel
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Export PDF
        </button>
        {/* Impression */}
        <button
          onClick={handlePrint}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 z-[9999]"
        >
          Imprimer
        </button>
      </div>

      <div className="hidden">
        <PrintableComponent ref={printRef} />
      </div>
    </div>
  );
};

export default ExportButtons;
