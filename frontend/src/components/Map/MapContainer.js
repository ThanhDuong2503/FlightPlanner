import React, {useState} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker, Polyline} from 'google-maps-react';
import MapStyles from "./MapStyles";

// const mapStyles = {
//     width: '100%',
//     height: '100%',
//     position: 'relative',
// };

export function MapContainer({google}) {

    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    // show infoWindow on click
    const onMarkerClick = (props, marker) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    }

    // close infoWindow on click
    const onClose = props => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    }

    // coords of Münster-Osnabrück Airport
    const FMOAirport = {
        lat: 52.133891,
        lng: 7.685239
    }

    // action on click at some points of the map
    const onMapClick = (mapProps, map, clickEvent) => {
        console.log(mapProps, map, clickEvent)
    }

    // coordinates for flight route
    const waypointCoords = [
        {lat: 52.133891, lng: 7.685239},
        {lat: 52.095680, lng: 7.617196},
        {lat: 51.958669, lng: 7.622893},
        {lat: 52.035371, lng: 7.829705},
        {lat: 52.133891, lng: 7.685239}
    ];

    return (
        <div id={"map"}>
        <Map
            google={google}
            zoom={14}
            style={MapStyles.darkMap}
            initialCenter={FMOAirport}
            onClick={onMapClick}
        >
            <Polyline
                path={waypointCoords}
                strokeColor="#3d5afe"
                strokeOpacity={0.8}
                strokeWeight={4}
            />

            <Marker
                onClick={onMarkerClick}
                name={"current Location"}
            />

            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}
                onClose={onClose}
            >
                <div>
                    <h3>{selectedPlace.name}</h3>
                </div>
            </InfoWindow>
        </Map>
        </div>
    );
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);