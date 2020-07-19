import React, {useState, useCallback, useContext} from 'react';
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

    // prevent map to trigger a re-render ;
    // useCallback creates a function which always keeps the same value unless deps are changed;
    const onMapClick = useCallback((event) => {setMarkers(current => [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
    }])
    }, [])


    if (loadError) return "Error loading Map";
    if (!isLoaded) return "Loading Map...";

    // coordinates and styling for Polyline to draw flight route
    const waypointCoords = markers.map(marker => {
        return {lat: marker.lat, lng: marker.lng};
    })
    const polylineOptions = {
        strokeColor: darkMode? '#ffbc00': '#003e6f',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    }


    // const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    // const [selectedPlace, setSelectedPlace] = useState({});
    //
    // // show infoWindow on click
    // const onMarkerClick = (props, marker) => {
    //     setSelectedPlace(props);
    //     setActiveMarker(marker);
    //     setShowingInfoWindow(true);
    // }
    //
    // // close infoWindow on click
    // const onClose = props => {
    //     if (showingInfoWindow) {
    //         setShowingInfoWindow(false);
    //         setActiveMarker(null);
    //     }
    // }

    return (
        <div>
        <GoogleMap
            zoom={14}
            mapContainerStyle={containerStyle}
            center={FMOAirport}
            options={options}
            onClick={onMapClick}
        >
            {markers.map((marker, index) => <Marker key={index} id={index} position={{
             lat: marker.lat,
             lng: marker.lng,
            }}
            />)}

            <Polyline
                path={waypointCoords}
                options={polylineOptions}
            />


            {/*<InfoWindow*/}
            {/*    marker={activeMarker}*/}
            {/*    visible={showingInfoWindow}*/}
            {/*    onClose={onClose}*/}
            {/*>*/}
            {/*    <div>*/}
            {/*        <h3>{selectedPlace.name}</h3>*/}
            {/*    </div>*/}
            {/*</InfoWindow>*/}
        </GoogleMap>
        </div>
    );
}