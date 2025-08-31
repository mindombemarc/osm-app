import { FaPrint } from "react-icons/fa"; 
import PrintComponent from "../component/PrintComponent";
import React, { useState } from "react";
import { X } from "lucide-react";


function Sidebar({ comptablesDuBureau,selectedBureau,setSelectedBureau ,filteredBureaux}) {
  const [showPrint,setShowPrint] = useState(false)
console.log(filteredBureaux[0]);

   const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Impression Bureaux</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Liste des Comptables</h2>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Nom</th>
                <th>matricule</th>
                <th>Fonction</th>
                <th>specialite</th>

              </tr>
            </thead>
            <tbody>
              ${comptablesDuBureau
                .map(
                  (b) => `
                <tr>
                  <td>${b.bureau_id}</td>
                  <td>${b.nom}</td>
                  <td>${b.matricule}</td>
                  <td>${b.Fonction}</td>
                  <th>${b.specialite}</th>
                </tr>
                })}
              `).join("")}
              
            </tbody>
             
          </table>
             <h2>Liste de bureaux</h2>
          <table>
            <thead>
              <tr>
                
                <th>Nom Bureau</th>                
                <th>Adresse</th>
                <th>Province</th>
                <th>code_bureau</th>
                
              </tr>
            </thead>
            <tbody>
              ${filteredBureaux
                .map(
                  (bureau) => `
                <tr>
                  <td>${bureau.nom}</td>
                  <td>${bureau.adresse}</td>
                  <td>${bureau.province}</td>
                  <td>${bureau.code_bureau}</td>
                </tr>                
                })}
              `).join("")}
            </tbody>
             
          </table>
        </body>
      </html>
    `;
     

    const impression = window.open("", "_blank");
    impression.document.write(printContent);
    impression.document.close();
    impression.focus();
    impression.print();

    setShowPrint(false);
  };
  const HandleCloseSidebar = ()=>{
    setSelectedBureau(null)
  }
  return (
    <div className={`p-4 border-t md:border-t-0 md:border-l border-gray-300 overflow-y-auto hide-scrollbar h-screen bg-gray-800 text-gray-100 bg-gray-300 h-full`}>
     

      {selectedBureau ? (
        <div className="overflow-y-auto  flex flex-col">

         <div className=" flex  justify-between overflow-y-auto  ">
          <h2 className=" uppercase semi-bold text-lg font-semibold mb-4">Détails du bureau {selectedBureau.province}</h2>
          <X className=" cursor-pointer" onClick={HandleCloseSidebar}/>
         </div>
          <h3 className="font-bold text-xl text-center">{selectedBureau.nom}</h3>
          {selectedBureau.image_url && (
            <img
              src={selectedBureau.image_url}
              alt={selectedBureau.nom}
              className="mt-4 mb-4 rounded-lg lg:w-[100%] h-[70%] shadow-lg max-h-40 object-cover w-full"
            />
          )}
         <div className="flex flex-col  shadow-lg shadow-gray-700 p-4 rounded-lg ">
           <p ><b className="uppercase ">Code bureau:</b> {selectedBureau.code_bureau}</p>
          <p><b className="uppercase ">Province:</b> {selectedBureau.province}</p>
          <p><b className="uppercase ">Adresse:</b> {selectedBureau.adresse}</p>
        
          

          <h4 className=" uppercase mt-6 font-semibold">Comptables rattachés</h4>
          {comptablesDuBureau.length > 0 ? (
            <ul className="list-none list-inside flex flex-col overflow-auto h-screen ">
              {comptablesDuBureau.map(c => (
                <li key={c.id}>
                  <b><p className="uppercase">{c.nom }</p>
                  </b> Matricule : ({c.matricule}) <p> Fonction : {c.Fonction} </p><p>Spécialité: {c.specialite}</p>
                </li>
                
              ))}
             <div className="flex justify-center text-center items-center ">
               <button
                onClick={() => setShowPrint(true)}
                className="flex items-centerpx-4 py-2 px-5 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FaPrint />
                Imprimer
              </button>
             </div>
            </ul>
             
          ) : (
            <p>Aucun comptable pour ce bureau.</p>
          )}
          
          </div>
                 {/* Bouton d'impression */}
           
            {/* Modal impression */}
      {showPrint && (
        <PrintComponent
          data={filteredBureaux}
          onClose={() => setShowPrint(false)}
          handlePrint={handlePrint}
        />
      )}
        </div>
      ) : (
        <p className="text-gray-600">Cliquez sur un marqueur pour voir les détails du bureau ici.</p>
      )}
      
    </div>
  );
}

export default Sidebar;
