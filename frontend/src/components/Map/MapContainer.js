import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or shows the infoWindow
        activeMarker: {},          //Shows active marker on click
        selectedPlace: {}          //Shows infoWindow to the selected place of a marker
    };

    // show infoWindow on click
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    // close infoWindow on click
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{
                    lat: 52.133891,
                    lng: 7.685239
                }}>
            <Marker
                onClick={this.onMarkerClick}
                name={"Flughafen Münster-Osnabrück"}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
                <div>
                    <h3>{this.state.selectedPlace.name}</h3>
                </div>
            </InfoWindow>
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyCjNv3-COqpYduLFSVMp0eq-NCAvkxibUU"
})(MapContainer);