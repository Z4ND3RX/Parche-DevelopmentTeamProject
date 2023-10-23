import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "./ends/NavBar";
import Footer from "./ends/Footer";
import CustomMarker from "./map/marker/CustomMarker";
import { API_URL } from "../../services/Apirest";
import axios from "axios";

function MapView() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    let url = API_URL + `/events`;
    axios
      .get(url)
      .then((response) => {
        const filteredMarkers = response.data.filter(
          (marker) => marker.latitude !== null && marker.longitude !== null
        );
        setMarkers(filteredMarkers);
        console.log(filteredMarkers); // Imprime los marcadores válidos en la consola
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleMarkerClick = (marker) => {
    // Al hacer clic en un marcador, guarda el marcador seleccionado
    setSelectedMarker(marker);
    console.log(marker);
  };

  const handleTitleClick = (marker) => {
    // Al hacer clic en el título, guarda el marcador seleccionado
    console.log(marker);
    setSelectedMarker(marker);
  };

  return (
    <>
      <NavBar />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.latitude, marker.longitude]}>
            <Popup>
              <div>
                <h3 style={{ cursor: "pointer" }} onClick={() => handleTitleClick(marker)}>{marker.title}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Footer />
    </>
  );
}

export default MapView;
