import React, {useState, useCallback, useContext, useRef} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import MapStyles from "./MapStyles";
import {DarkThemeContext} from "../../context/theme/DarkThemeContext";

// additional google libraries; "places" for the search function on the map
const libraries = ["places"];

// set size of the rendered map
const containerStyle = {
    width: "100vw",
    height: "100vh",
};

// map styling
const mapOptions = {
    styles: MapStyles.darkMap
}

// coords of Münster-Osnabrück Airport for initial center
const FMOAirport = {
    lat: 52.133891,
    lng: 7.685239
}

export default function MapContainer() {

    // script to load the map + libraries
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    // darkMode for the map
    const darkMode = useContext(DarkThemeContext);
    const options = {...mapOptions, styles: darkMode ? MapStyles.darkMap : MapStyles.lightMap}

    // set markers onClick on the map
    const [markers, setMarkers] = useState([]);

    // infoWindow for selected marker
    const [selectedMarker, setSelectedMarker] = useState(null);

    // prevent map to trigger a re-render ;
    // useCallback creates a function which always keeps the same value unless deps are changed;
    const onMapClick = useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }])
    }, []);

    // makes map re-center to new position & prevents re-render;
    // useRef keeps a state without re-render (= opposite of useState);
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading Map";
    if (!isLoaded) return "Loading Map...";

    // coordinates and styling for Polyline to draw flight route
    const waypointCoords = markers.map(marker => {
        return {lat: marker.lat, lng: marker.lng};
    })
    const polylineOptions = {
        strokeColor: darkMode ? '#ffbc00' : '#003e6f',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    }

    return (
        <div>
            <GoogleMap
                zoom={14}
                mapContainerStyle={containerStyle}
                center={FMOAirport}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker, index) =>
                    <Marker key={index}
                            id={index}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng,
                            }}
                            onClick={() => {
                                setSelectedMarker(marker);
                            }}
                    />)}

                {selectedMarker ?
                    <InfoWindow
                        position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                        onCloseClick={() => {setSelectedMarker(null)}}>
                        <div>
                            <h2>Waypoint {selectedMarker.id}</h2>
                            <h4>{selectedMarker.lat}</h4>
                            <h4>{selectedMarker.lng}</h4>
                        </div>
                    </InfoWindow> : null}

                <Polyline
                    path={waypointCoords}
                    options={polylineOptions}
                />

            </GoogleMap>
        </div>
    );
}