import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyMap({ onLocationSelected }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  const addMarker = (e) => {
    setMarker(e.latlng);
    onLocationSelected(e.latlng); // Llama a la función de devolución de llamada con las coordenadas seleccionadas
  }

  const Markers = () => {
    useMapEvents({
      click: addMarker,
      dblclick: (e) => {
        e.originalEvent.stopPropagation();
      },
    });

    return marker === null ? null : (
      <Marker position={marker}>
        <Popup>
          <span>Ubicación del lugar.</span>
        </Popup>
      </Marker>
    );
  }

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <MapContainer whenCreated={setMap} style={{ height: "100%", width: "100%" }} doubleClickZoom={false} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
      </MapContainer>
    </div>
  );
}

export default MyMap;
