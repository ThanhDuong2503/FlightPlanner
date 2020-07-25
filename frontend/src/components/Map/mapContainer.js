import React, {useState, useCallback, useContext, useRef, useEffect} from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import MapStyles from "./MapStyles";
import {DarkThemeContext} from "../../context/theme/DarkThemeContext";
import "@reach/combobox/styles.css";
import "./searchBox.css";
import Homebase from "./Homebase";
import Search from "./Search";
import SelectedMarkerInfoWindow from "./SelectedMarkerInfoWindow";
import FlightRoute from "./FlightRoute";
import {addWaypoint} from "../../context/waypoints/waypointActions";
import {WaypointDispatchContext, WaypointStateContext} from "../../context/waypoints/WaypointContext";


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

// function insertWaypoint(latitude, longitude) {
//     const [newWaypoint, setNewWaypoint] = useState([]);
//     const {addStatus} = useContext(WaypointStateContext);
//     useEffect(() => {
//         if (addStatus === 'SUCCESS') {
//             setNewWaypoint([latitude , longitude]);
//         }
//         // this is important to avoid an error when deploying!!! ...means "ignore" handleClose error
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [addStatus]);
//
//     const dispatch = useContext(WaypointDispatchContext);
//
//
// }


// async function fetchWaypoints() {
//     const response = await fetch("/api/map");
//     const waypoints = await response.json();
//     return waypoints.map((waypoint) => ({
//         longitude: waypoint.longitude,
//         latitude: waypoint.latitude,
//     }));
// }


function MapContainer() {

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
        console.log(event)
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            placeId: event.placeId,
        }])
    }, []);

    // makes map re-center to new position & prevents re-render;
    // useRef keeps a state without re-rendering (= opposite of useState);
    const mapPosition = useRef();
    const onMapLoad = useCallback((map) => {
        mapPosition.current = map;
    }, []);

    // re-center map to new search location
    const reCenter = useCallback(({lat, lng}) => {
        mapPosition.current.panTo({lat, lng});
        mapPosition.current.setZoom(15);
    }, []);


    if (loadError) return "Error loading Map";
    if (!isLoaded) return "Loading Map...";


    return (
        <div>
            <Search panTo={reCenter}/>
            <Homebase panTo={reCenter}/>

            <GoogleMap
                zoom={12}
                mapContainerStyle={containerStyle}
                center={FMOAirport}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {selectedMarker && <SelectedMarkerInfoWindow selectedMarker={selectedMarker}
                                                             markerIndex={markers.indexOf(selectedMarker)}
                                                             onClose={() => setSelectedMarker(null)}
                                                             onMarkerDelete={() => {
                                                                 setSelectedMarker(null)
                                                                 setMarkers(markers.filter(marker => marker !== selectedMarker))
                                                             }}/>
                }
                <FlightRoute markers={markers} setSelectedMarker={setSelectedMarker}/>
            </GoogleMap>
        </div>
    );
}

export default MapContainer;