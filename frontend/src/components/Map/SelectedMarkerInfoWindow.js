import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import LocationOffIcon from '@material-ui/icons/LocationOff';
import CommentIcon from '@material-ui/icons/Comment';
import {InfoWindow} from "@react-google-maps/api";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import AddDescriptionDialog from "../WaypointDialog/AddDescriptionDialog";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        backgroundColor: '#3C5E79',
        '&:hover': {
            backgroundColor: '#135f7c',
        },
        borderRadius: 20,
        // boxShadow: '5px 8px rgba(0, 41, 66, .9)'
    },
    cardContent: {
        background: "linear-gradient(45deg, #1b7aaa 30%, #02213F 60%)"
    },
});

function SelectedMarkerInfoWindow({selectedMarker, onClose, markerIndex, onMarkerDelete}) {

    const [showAddDialog, setShowAddDialog] = useState(false);
    const classes = useStyles();

    return (
        <InfoWindow
            position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
            onCloseClick={onClose}>
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" color="textPrimary" gutterBottom>
                        Waypoint {markerIndex}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        lat: {selectedMarker.lat}
                        <br/>
                        lng: {selectedMarker.lng}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary">
                        {selectedMarker.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container direction={"row"} wrap={"nowrap"} justify={"space-around"}>
                        <IconButton color="primary" onClick={onMarkerDelete}>
                            <LocationOffIcon/>
                        </IconButton>
                        <IconButton color="primary" onClick={() => setShowAddDialog(true)}>
                            <CommentIcon/>
                        </IconButton>
                        <AddDescriptionDialog
                            markerId={selectedMarker.id}
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