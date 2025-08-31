import React from "react";

const PrintComponent = ({ onClose, handlePrint }) => {
  return (
    <div className="fixed inset-0 bg-black  text-gray-600 bg-opacity-40 flex items-center justify-center z-[9999]  animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-scaleIn w-[80%] lg:w-[30%]">
        <p>Voulez-vous imprimer la liste actuelle des bureaux ?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
