import {Marker, Polyline} from "@react-google-maps/api";
import React, {useContext} from "react";
import {DarkThemeContext} from "../../context/theme/DarkThemeContext";


function FlightRoute({markers, setSelectedMarker}) {

    const darkMode = useContext(DarkThemeContext);

    // coordinates and styling for Polyline to draw flight route
    const polylineCoords = markers.map(marker => {
        return {lat: marker.lat, lng: marker.lng};
    })
    const polylineOptions = {
        strokeColor: darkMode ? '#ffbc00' : '#003e6f',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    }

    return (
        <>
            {markers.map((marker, index) =>
                <Marker key={index}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng,
                        }}
                        onClick={() => {
                            setSelectedMarker(marker);
                        }}
                />)}

            <Polyline
                path={polylineCoords}
                options={polylineOptions}
            />
        </>
    )
}

export default FlightRoute;