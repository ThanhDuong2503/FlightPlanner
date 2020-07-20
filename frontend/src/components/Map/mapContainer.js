import React, {useState, useCallback, useContext, useRef} from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Polyline} from '@react-google-maps/api';
import MapStyles from "./MapStyles";
import {DarkThemeContext} from "../../context/theme/DarkThemeContext";
import "@reach/combobox/styles.css";
import "./searchBox.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Homebase from "./Homebase";
import Search from "./Search";


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
    const mapPosition = useRef();
    const onMapLoad = useCallback((map) => {
        mapPosition.current = map;
    }, []);

    // re-center map to new search location
    const reCenter = useCallback(({lat, lng}) => {
        mapPosition.current.panTo({lat, lng});
        mapPosition.current.setZoom(15);
    }, []);

    // coordinates and styling for Polyline to draw flight route
    const polylineCoords = markers.map(marker => {
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
                        <Card elevation={20}>
                            <CardContent>
                                <Typography variant="h5" color="textPrimary" gutterBottom>
                                    Waypoint {markers.indexOf(selectedMarker)}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {selectedMarker.lat}
                                    <br/>
                                    {selectedMarker.lng}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="delete" color="primary" onClick={() => {
                                    setSelectedMarker(null)
                                    markers.splice(markers.indexOf(selectedMarker), 1)
                                }}>
                                    <DeleteForeverOutlinedIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </InfoWindow> : null}

                <Polyline
                    path={polylineCoords}
                    options={polylineOptions}
                />
            </GoogleMap>
        </div>
    );
}

export default MapContainer;