import React, { useState } from "react";
import MapView from "./component/MapView";


function App() {
  const [method, setMethod] = useState("province");
  const [inputValue, setInputValue] = useState("");
  const [filterProvince, setFilterProvince] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [filterSpecialite, setFilterSpecialite] = useState("");
  const [searchText, setSearchText] = useState("");





  const bureaux = [
    {
      id: 1,
      code_bureau: "BC001",
      nom: "Bureau Comptable Principal Kinshasa",
      province: "Kinshasa",
      latitude: -4.4419,
      longitude: 15.2663,
      adresse: "Kinshasa Centre",
      image_url: "bakc.jpg",
      rayon_zone: 10,
    },
    {
      id: 2,
      code_bureau: "BC002",
      nom: "Bureau Comptable Provincial Lubumbashi",
      province: "Haut-Katanga",
      latitude: -11.66,
      longitude: 27.48,
      adresse: "Lubumbashi",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Lubumbashi_downtown.jpg",
      rayon_zone: 10,
    },
    {
      id: 3,
      code_bureau: "BC003",
      nom: "Bureau Comptable Provincial Kisangani",
      province: "Tshopo",
      latitude: 0.5167,
      longitude: 25.2,
      adresse: "Kisangani",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Kisangani_River.jpg",
      rayon_zone: 10,
    },
    {
      id: 4,
      code_bureau: "BC004",
      nom: "Bureau Comptable Provincial Mbandaka",
      province: "Équateur",
      latitude: 0.04,
      longitude: 18.26,
      adresse: "Mbandaka",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Mbandaka_market.jpg",
      rayon_zone: 10,
    },
    {
      id: 5,
      code_bureau: "BC005",
      nom: "Bureau Comptable Provincial Goma",
      province: "Nord-Kivu",
      latitude: -1.68,
      longitude: 29.23,
      adresse: "Goma",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Goma_city.jpg",
      rayon_zone: 10,
    },
  ];

  const comptables = [
    {
      id: 1,
      nom: "Jean Mbala",
      matricule: "M001",
      Fonction: "principal",
      specialite: "comptabilité publique",
      bureau_id: 1,
    },
    {
      id: 2,
      nom: "Alice Kanku",
      matricule: "M002",
      Fonction: "subordonné",
      specialite: "audit",
      bureau_id: 1,
    },
    {
      id: 3,
      nom: "Patrick Ilunga",
      matricule: "M003",
      Fonction: "subordonné",
      specialite: "gestion financière",
      bureau_id: 1,
    },
    {
      id: 4,
      nom: "Marie Katumbi",
      matricule: "M004",
      Fonction: "principal",
      specialite: "comptabilité publique",
      bureau_id: 2,
    },
    {
      id: 5,
      nom: "Simon Mukendi",
      matricule: "M005",
      Fonction: "subordonné",
      specialite: "audit",
      bureau_id: 2,
    },
    {
      id: 6,
      nom: "Christophe Wemba",
      matricule: "M006",
      Fonction: "principal",
      specialite: "comptabilité publique",
      bureau_id: 3,
    },
    {
      id: 7,
      nom: "Nadine Kalume",
      matricule: "M007",
      Fonction: "subordonné",
      specialite: "gestion financière",
      bureau_id: 3,
    },
    {
      id: 8,
      nom: "Julien Bofane",
      matricule: "M008",
      Fonction: "principal",
      specialite: "comptabilité publique",
      bureau_id: 4,
    },
    {
      id: 9,
      nom: "Pauline Masika",
      matricule: "M009",
      Fonction: "principal",
      specialite: "audit",
      bureau_id: 5,
    },
    {
      id: 10,
      nom: "David Kamate",
      matricule: "M010",
      Fonction: "subordonné",
      specialite: "gestion financière",
      bureau_id: 5,
    },
  ];

  // Filtrage bureaux
  const filteredBureaux = bureaux.filter((bureau) => {
    if (window.innerWidth >= 768) {
      // Desktop: filtrage province + recherche texte bureau
      return (
        (!filterProvince ||
          bureau.province.toLowerCase().includes(filterProvince.toLowerCase())) &&
        (!searchText ||
          bureau.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          comptables.some(
            (c) =>
              c.bureau_id === bureau.id &&
              (c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                c.matricule.toLowerCase().includes(searchText.toLowerCase()))
          ))
      );
    } else {
      // Mobile : selon méthode mobile
      if (method === "province") {
        return (
          (!inputValue ||
            bureau.province.toLowerCase().includes(inputValue.toLowerCase())) &&
          (!searchText ||
            bureau.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            comptables.some(
              (c) =>
                c.bureau_id === bureau.id &&
                (c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                  c.matricule.toLowerCase().includes(searchText.toLowerCase()))
            ))
        );
      } else if (method === "bureau") {
        return (
          (!inputValue ||
            bureau.nom.toLowerCase().includes(inputValue.toLowerCase())) &&
          (!searchText ||
            bureau.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            comptables.some(
              (c) =>
                c.bureau_id === bureau.id &&
                (c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                  c.matricule.toLowerCase().includes(searchText.toLowerCase()))
            ))
        );
      } else {
        return (
          !searchText ||
          bureau.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          comptables.some(
            (c) =>
              c.bureau_id === bureau.id &&
              (c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                c.matricule.toLowerCase().includes(searchText.toLowerCase()))
          )
        );
      }
    }
  });

  const filteredBureauIds = filteredBureaux.map((b) => b.id);

  // Filtrage comptables
  const filteredComptables = comptables.filter((c) => {
    if (window.innerWidth >= 768) {
      return (
        filteredBureauIds.includes(c.bureau_id) &&
        (!filterStatut || c.statut.toLowerCase() === filterStatut.toLowerCase()) &&
        (!filterSpecialite ||
          c.specialite.toLowerCase().includes(filterSpecialite.toLowerCase())) &&
        (!searchText ||
          c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          c.matricule.toLowerCase().includes(searchText.toLowerCase()))
      );
    } else {
      if (method === "province") {
        return (
          filteredBureauIds.includes(c.bureau_id) &&
          (!filterSpecialite ||
            c.specialite.toLowerCase().includes(filterSpecialite.toLowerCase())) &&
          (!searchText ||
            c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            c.matricule.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else if (method === "statut") {
        return (
          filteredBureauIds.includes(c.bureau_id) &&
          (!filterSpecialite ||
            c.specialite.toLowerCase().includes(filterSpecialite.toLowerCase())) &&
          (!searchText ||
            c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            c.matricule.toLowerCase().includes(searchText.toLowerCase())) &&
          (!inputValue || c.statut.toLowerCase() === inputValue.toLowerCase())
        );
      } else if (method === "specialite") {
        return (
          filteredBureauIds.includes(c.bureau_id) &&
          (!inputValue ||
            c.specialite.toLowerCase().includes(inputValue.toLowerCase())) &&
          (!searchText ||
            c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            c.matricule.toLowerCase().includes(searchText.toLowerCase()))
        );
      } else if (method === "bureau") {
        // Pas de filtre spécial sur comptable ici
        return (
          filteredBureauIds.includes(c.bureau_id) &&
          (!searchText ||
            c.nom.toLowerCase().includes(searchText.toLowerCase()) ||
            c.matricule.toLowerCase().includes(searchText.toLowerCase()))
        );
      }
    }
  });

  const MethodChange = (e) => {
    setMethod(e.target.value);
    setInputValue("");

  };

  return (
    <div className="p-4 bg-gray-800 mx-auto flex flex-col h-screen overflow-hidden">
      <div className="flex gap-2 max-w-md mx-auto md:hidden w-full">
        {(method === "province" ||
          method === "Poste" ||
          method === "bureau") && (
            <input
              type="text"
              placeholder={
                method === "province"
                  ? "Chercher par province"
                  : method === "Poste"
                    ? "Chercher par poste"
                    : "Chercher par bureau"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-b rounded px-3 py-2 flex-grow max-w-full"
              style={{ minWidth: 0 }}
            />
          )}
        {method === "Fonction" && (
          <select
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-b rounded px-3 py-2 flex-grow max-w-full"
            style={{ minWidth: 0 }}
          >
            <option value="">Tous Fonction</option>
            <option value="principal">Principal</option>
            <option value="subordonné">Subordonné</option>
          </select>
        )}
        <select
          value={method}
          onChange={MethodChange}
          className="border-b rounded px-3 py-2 flex-shrink-0 max-w-[70px]"
          aria-label="Changer méthode de recherche"
        >
          <option value="province">Province</option>
          <option value="Fonction">Fonction</option>
          <option value="Poste">Poste</option>
          <option value="bureau">Bureau</option>
        </select>
      </div>


      <div className="hidden  md:flex flex-wrap justify-between gap-4 w-full mx-auto">
        <input
          type="text"
          placeholder="Chercher par province"
          value={filterProvince}
          onChange={(e) => setFilterProvince(e.target.value)}
          className="border-b  rounded-lg bg-gray-800 text-white rounded px-3 py-2 min-w-[180px]"
        />
        <input
          type="text"
          placeholder="bureau comptable matricule..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-b rounded  rounded-lg bg-gray-800 text-white px-3 py-2 min-w-[180px]"
        />

        <input
          type="text"
          placeholder="Cherche par spécialité"
          value={filterSpecialite}
          onChange={(e) => setFilterSpecialite(e.target.value)}
          className="border-b rounded rounded-lg bg-gray-800 text-white px-3 py-2 min-w-[180px]"
        />

        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          className="border-b rounded-lg  px-3 py-2 text-gray-500 min-w-[180px]"
        >
          <option value="">Tous Fonction</option>
          <option value="principal">Principal</option>
          <option value="subordonné">Subordonné</option>
        </select>



      </div>


      <div className="mt-4 w-full overflow-hidden flex-1">
        <MapView
          bureaux={filteredBureaux}
          comptables={filteredComptables}
        />
      </div>






    </div>
  );
}

export default App;
