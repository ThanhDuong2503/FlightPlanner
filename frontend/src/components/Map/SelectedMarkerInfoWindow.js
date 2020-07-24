import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import LocationOffIcon from '@material-ui/icons/LocationOff';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import {InfoWindow} from "@react-google-maps/api";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import AddWaypointDialog from "../WaypointDialog/AddWaypointDialog";


function SelectedMarkerInfoWindow({selectedMarker, onClose, markerIndex, onMarkerDelete}) {

    const [showAddDialog, setShowAddDialog] = useState(false);

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
                    <Grid container direction={"row"} wrap={"nowrap"} justify={"space-around"}>
                        <IconButton aria-label="delete" color="primary" onClick={onMarkerDelete}>
                            <LocationOffIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" color="primary" onClick={() => setShowAddDialog(true)}>
                            <AddLocationIcon/>
                        </IconButton>
                        <AddWaypointDialog
                            open={showAddDialog}
                            handleClose={() => setShowAddDialog(false)}
                        />
                    </Grid>
                </CardActions>
            </Card>
        </InfoWindow>
    )
}

export default SelectedMarkerInfoWindow