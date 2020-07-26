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
import {putWaypoint, fetchAllWaypoints} from "../../utils/waypoints-utils";


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


function MapContainer() {

    // script to load the map + libraries
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    // darkMode for the map
    const darkMode = useContext(DarkThemeContext);
    const options = {...mapOptions, styles: darkMode ? MapStyles.darkMap : MapStyles.lightMap}

    // infoWindow for selected marker
    const [selectedMarker, setSelectedMarker] = useState(null);

    // set markers onClick on the map
    const [markers, setMarkers] = useState([]);

    // render all waypoints of the active user
    async function fetchWaypoints() {
        const waypoints = fetchAllWaypoints().then(data =>
            data.map(waypoint => {
            return {
                lng: waypoint.longitude,
                lat: waypoint.latitude,
            }
        }))
        return waypoints;
    }

    useEffect(() => {
        fetchWaypoints().then(data => setMarkers(data))
    }, []);


    // prevent map to trigger a re-render ;
    // useCallback creates a function which always keeps the same value unless deps are changed;
    // const onMapClick = useCallback((event) => {
    //     console.log(event)
    //     setMarkers(current => [...current, {
    //         lat: event.latLng.lat(),
    //         lng: event.latLng.lng(),
    //         placeId: event.placeId,
    //     }])
    // }, []);


    const onMapClick = useCallback((event) => {
        putWaypoint(event.latLng.lat(), event.latLng.lng())
            .then((waypoint) => {
                setMarkers(current => [...current, {
                    lng: waypoint.longitude,
                    lat: waypoint.latitude,
                }])
            })
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