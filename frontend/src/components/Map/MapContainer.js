import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                initialCenter={{
                    lat: 52.133891,
                    lng: 7.685239
                }}
            />
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyCjNv3-COqpYduLFSVMp0eq-NCAvkxibUU"
})(MapContainer);