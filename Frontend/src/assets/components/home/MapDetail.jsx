// MapDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapDetail({ initialLat, initialLng }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState([initialLat || 51.505, initialLng || -0.09]);
  const mapRef = useRef();

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  const Markers = () => {
    useMapEvents({
      click: (e) => setMarker(e.latlng),
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
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(marker, mapRef.current.getZoom());
    }
  }, [marker]);

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <MapContainer ref={mapRef} whenCreated={setMap} style={{ height: '81%', width: '81%' }} doubleClickZoom={false} center={marker} zoom={13}>
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
      </MapContainer>
    </div>
  );
}

export default MapDetail;
