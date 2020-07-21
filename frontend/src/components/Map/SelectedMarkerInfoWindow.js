import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import {InfoWindow} from "@react-google-maps/api";
import React from "react";

function SelectedMarkerInfoWindow ({selectedMarker, onClose, markerIndex, onMarkerDelete}) {
    return (
        <InfoWindow
            position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
            onCloseClick={onClose}>
            <Card elevation={20}>
                <CardContent>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        Waypoint {markerIndex}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {selectedMarker.lat}
                        <br/>
                        {selectedMarker.lng}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="delete" color="primary" onClick={onMarkerDelete}>
                        <DeleteForeverOutlinedIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </InfoWindow>
    )
}

export default SelectedMarkerInfoWindow