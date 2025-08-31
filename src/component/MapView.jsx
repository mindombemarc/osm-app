import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../pages/Sidebar";

function MapView({ bureaux, comptables }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markersLayer, setMarkersLayer] = useState(null);
  const [selectedBureau, setSelectedBureau] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Détecte si on est sur mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  useEffect(() => {
    if (!mapRef.current || map) return;

    const timer = setTimeout(() => {
      if (mapRef.current && !map) {
        const leafletMap = L.map(mapRef.current).setView([-4.4419, 15.2663], 6);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(leafletMap);

        setMap(leafletMap);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mapRef, map]);


  useEffect(() => {
    if (!map) return;

    if (markersLayer) {
      map.removeLayer(markersLayer);
      setMarkersLayer(null);
    }

    if (bureaux.length > 0) {
      const newMarker = L.layerGroup();

      bureaux.forEach((b) => {
        if (b.latitude && b.longitude) {
          const marker = L.marker([b.latitude, b.longitude])
            .on("click", () => setSelectedBureau(b))
            .bindPopup(`<b>${b.code_bureau} - ${b.nom}</b><br/>${b.adresse || ""}`);

          newMarker.addLayer(marker);
        }
      });

      newMarker.addTo(map);
      setMarkersLayer(newMarker);
    }
  }, [map, bureaux]);

  const comptablesDuBureau = selectedBureau
    ? comptables.filter((c) => c.bureau_id === selectedBureau.id)
    : [];

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-x-hidden">
      {/* Carte */}
      <div
        ref={mapRef}
        id="map"
        style={{
          height: "85%",
          width: isMobile
            ? "100%"
            : selectedBureau
            ? "70%" 
            : "100%", 
        }}
        className={`${isMobile && selectedBureau ? "hidden" : "block"}`}
      />

      {/* Sidebar */}
      <div
        className={`
          ${isMobile
            ? selectedBureau
              ? "w-full h-screen overflow-auto block"
              : "hidden"
            : selectedBureau
            ? "w-[30%] block h-screen overflow-auto"
            : "hidden"}
        `}
      >
        <Sidebar
          comptablesDuBureau={comptablesDuBureau}
          selectedBureau={selectedBureau}
          setSelectedBureau={setSelectedBureau}
          filteredBureaux={bureaux}
        />
      </div>
    </div>
  );
}

export default MapView;
