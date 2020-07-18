import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import MapContainer from "../components/Map/mapContainer";


function MapPage() {
    return (
        <div>
            <MainAppBar></MainAppBar>
            <MapContainer></MapContainer>
        </div>
    )
}

export default MapPage;