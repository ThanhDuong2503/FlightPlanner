import React, { useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
};

export function MapContainer() {

    const [showingInfoWindow, setShowingInfoWindow] = useState("false");
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    // state = {
    //     showingInfoWindow: false,  //Hides or shows the infoWindow
    //     activeMarker: {},          //Shows active marker on click
    //     selectedPlace: {}          //Shows infoWindow to the selected place of a marker
    // };

    // show infoWindow on click
    const onMarkerClick = (props, marker, e) =>
        setShowingInfoWindow(true);
        setActiveMarker("marker");
        setSelectedPlace("props");

        // this.setState({
        //     selectedPlace: props,
        //     activeMarker: marker,
        //     showingInfoWindow: true
        // });

    // close infoWindow on click
    const onClose = props => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
            }
        }


    // const mapClicked(mapProps, map, clickEvent) {
    //     console.log(mapProps,map,clickEvent)
    // }

        return (
            <Map
                google={"google"}
                zoom={15}
                style={mapStyles}
                initialCenter={{
                    lat: 52.133891,
                    lng: 7.685239
                }}
                // onClick={this.mapClicked}
            >
            <Marker
                onClick={onMarkerClick()}
                name={"Flughafen Münster-Osnabrück"}
            />
            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}
                onClose={onClose()}
            >
                <div>
                    <h3>{selectedPlace.name}</h3>
                </div>
            </InfoWindow>
            </Map>
        );
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyCjNv3-COqpYduLFSVMp0eq-NCAvkxibUU"
})(MapContainer);