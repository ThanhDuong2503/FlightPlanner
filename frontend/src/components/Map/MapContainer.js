import React, {useState} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
};

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

    // const mapClick(mapProps, map, clickEvent) {
    //     console.log(mapProps, map, clickEvent)
    // }

    return (
        <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
                lat: 52.133891,
                lng: 7.685239
            }}
            // onClick={mapClick}
        >
            <Marker
                onClick={onMarkerClick}
                name={"Flughafen Münster-Osnabrück"}
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
    );
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);