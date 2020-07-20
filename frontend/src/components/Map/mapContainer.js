import React, {useState, useCallback, useContext, useRef} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import MapStyles from "./MapStyles";
import {DarkThemeContext} from "../../context/theme/DarkThemeContext";
import earthLogo from "./earthLogo.png";

import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./searchBox.css";


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
    // useRef keeps a state without re-rendering (= opposite of useState);
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // re-center map to new search location
    const reCenter = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    // coordinates and styling for Polyline to draw flight route
    const waypointCoords = markers.map(marker => {
        return {lat: marker.lat, lng: marker.lng};
    })
    const polylineOptions = {
        strokeColor: darkMode ? '#ffbc00' : '#003e6f',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    }

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

                {selectedMarker ?
                    <InfoWindow
                        position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                        onCloseClick={() => {
                            setSelectedMarker(null)
                        }}>
                        <div>
                            <h2>Waypoint {selectedMarker.index}</h2>
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

// re-center to original user position
function Homebase({panTo}) {
    return (
        <button className="homeBase" onClick={() => {
            // if user's browser allows it, get user's position and re-center to it
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }, () => null)
        }}>
            <img src={earthLogo} alt="earthLogo"/>
        </button>
    )
}

function Search({panTo}) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            // search center point
            location: {
                lat: () => 52.133891,
                lng: () => 7.685239
            },
            // 300km radius search expansion range
            radius: 300 * 1000,
        }
    });
    return (
        <div className={"searchBox"}>
            <Combobox onSelect={async (address) => {
                // get selected address without fetching new data from google API
                setValue(address, false);

                // close results-list
                clearSuggestions();

                // 1) get a list of results --> 2) get lat,lng of first result item --> 3) map centers to this position
                try {
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    panTo({lat, lng});
                } catch (error) {
                    console.log("error while loading data...")
                }
            }}>
                <ComboboxInput value={value}
                               onChange={(event) => {
                                   setValue(event.target.value);
                               }}
                               disabled={!ready}
                               placeholder={"search..."}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

