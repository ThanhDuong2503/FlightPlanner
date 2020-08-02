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
                        icon={{
                            url: darkMode ? "/images/marker.png" : "/images/marker2.png",
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20),
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