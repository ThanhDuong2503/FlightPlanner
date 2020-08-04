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
import CloudIcon from '@material-ui/icons/Cloud';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        color: "#ffffff",
        backgroundColor: '#02213F',
        '&:hover': {
            backgroundColor: '#3C5E79',
        },
        borderRadius: 20,
        // boxShadow: "5px 5px 10px #586166, -5px -5px 10px #ffffff"
    },
    cardContent: {
        background: "linear-gradient(170deg, #1b7aaa 30%, #02213F 60%)"
    },
});

function SelectedMarkerInfoWindow({selectedMarker, onClose, markerIndex, onMarkerDelete}) {

    const [showAddDialog, setShowAddDialog] = useState(false);
    const classes = useStyles();
    const history = useHistory();


    return (
        <InfoWindow
            position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
            onCloseClick={onClose}>
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        Waypoint {markerIndex}
                    </Typography>
                    <Typography variant="body1">
                        lat: {selectedMarker.lat}
                        <br/>
                        lng: {selectedMarker.lng}
                    </Typography>
                    <Typography variant="subtitle1">
                        {selectedMarker.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container direction={"row"} wrap={"nowrap"} justify={"space-around"}>
                        <IconButton color="primary" onClick={() => setShowAddDialog(true)}>
                            <CommentIcon/>
                        </IconButton>
                        <AddDescriptionDialog
                            markerId={selectedMarker.id}
                            open={showAddDialog}
                            handleClose={() => setShowAddDialog(false)}
                        />
                        <IconButton color="primary" onClick={() => {
                            // switches to Weather page & set lat&lon into URL --> useLocation at WeatherPage
                            history.push(`/weather?lat=${selectedMarker.lat}&lon=${selectedMarker.lng}`)
                        }}>
                            <CloudIcon/>
                        </IconButton>
                        <IconButton color="primary" onClick={onMarkerDelete}>
                            <LocationOffIcon/>
                        </IconButton>
                    </Grid>
                </CardActions>
            </Card>
        </InfoWindow>
    )
}

export default SelectedMarkerInfoWindow