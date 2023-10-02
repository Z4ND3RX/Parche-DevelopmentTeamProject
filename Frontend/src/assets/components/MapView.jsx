import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NavBar from './ends/NavBar';
import Footer from './ends/Footer';
import Marker from './map/marker/CustomMarker';
import CustomMarker from './map/marker/CustomMarker';

function MapView() {

    const [state, setState] = useState({
        longitude: 0,
        latitude: 0
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            },
            function (error) {
                console.log(error);
            },
            {
                enableHighAccuracy: true
            }
        )
    }, [])
    const position = [state.latitude, state.longitude];

    return (
        <>
            <NavBar />
            {state.latitude !== 0 && state.longitude !== 0 && (
                <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <CustomMarker position={position} text="Hola" />
                </MapContainer>)}
            <Footer />
        </>
    )
}

export default MapView