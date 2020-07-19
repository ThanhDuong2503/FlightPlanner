import React, {useState, useCallback} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import MapStyles from "./MapStyles";

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

// coords of Münster-Osnabrück Airport
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

    // set markers onClick on the map
    const [markers, setMarkers] = useState([]);

    // prevent map to trigger a re-render ;
    // useCallback creates a function which always keep the same value unless deps are changed;
    const onMapClick = useCallback((event) => {setMarkers(current => [...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
    }])
    }, [])


    if (loadError) return "Error loading the map";
    if (!isLoaded) return "Loading Maps...";



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

    // // coordinates for flight route
    // const waypointCoords = [
    //     {lat: 52.133891, lng: 7.685239},
    //     {lat: 52.095680, lng: 7.617196},
    //     {lat: 51.958669, lng: 7.622893},
    //     {lat: 52.035371, lng: 7.829705},
    //     {lat: 52.133891, lng: 7.685239}
    // ];


    return (
        <div>
        <GoogleMap
            zoom={14}
            mapContainerStyle={containerStyle}
            center={FMOAirport}
            options={mapOptions}
            onClick={onMapClick}
        >
            {markers.map((marker, index) => <Marker key={index} id={index} position={{
             lat: marker.lat,
             lng: marker.lng,
            }}
            />)}

            {/*<Polyline*/}
            {/*    path={waypointCoords}*/}
            {/*    strokeColor="#3d5afe"*/}
            {/*    strokeOpacity={0.8}*/}
            {/*    strokeWeight={4}*/}
            {/*/>*/}


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