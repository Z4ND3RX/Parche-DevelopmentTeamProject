import React from 'react'
import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ position, text }) => {
    return (
      <Marker position={position}>
        <Popup>{text}</Popup>
      </Marker>
    );
  };
  
  export default CustomMarker;