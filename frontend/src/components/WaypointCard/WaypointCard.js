import React, {useContext, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import {WaypointDispatchContext} from "../../context/waypoints/WaypointContext";
import {removeWaypoint} from "../../context/waypoints/waypointActions";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import AddDescriptionDialog from "../WaypointDialog/AddDescriptionDialog";

const useStyles = makeStyles({
    root: {
        margin: 10,
        backgroundColor: '#02213F',
        '&:hover': {
            backgroundColor: '#3C5E79',
            boxShadow: "7px 8px rgba(0, 0, 0, 0.2)",
        },
        borderRadius: 20,
        boxShadow: "7px 7px 20px #000000, -5px -5px 10px #ffffff",
    },
    cardName: {
        textShadow: '3px 4px rgba(0, 41, 66, .9)',
    },
    cardContent: {
        background: "linear-gradient(170deg, #1b7aaa 30%, #02213F 60%)",
        color: "#ffffff",
    },
});


function WaypointCard({waypoint}) {

    const dispatch = useContext(WaypointDispatchContext);
    const classes = useStyles();
    const history = useHistory();

    const [showAddDialog, setShowAddDialog] = useState(false);

    function handleDelete(event) {
        event.stopPropagation();
        removeWaypoint(dispatch, waypoint.id);
        history.push(`/waypoints/`)
    }


    return (
        <Grid item xs={10} sm={6} lg={3}>
            <Card
                className={classes.root}
                onClick={() => history.push(`/waypoints/${waypoint.id}`)}
            >
                <CardActionArea>
                    {waypoint.placeId && <CardMedia
                        component="img"
                        alt="waypoint picture"
                        height="300"
                        image={waypoint.imageUrl}
                        title="waypoint picture"
                    />}
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.cardName} variant="h5" component="h2">
                            {waypoint.waypointName} <br/>
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                            {waypoint.waypointAddress} <br/>
                        </Typography>
                        <Typography variant="subtitle2" component="p">
                            Lat: {waypoint.latitude} <br/>
                            Lng: {waypoint.longitude} <br/>
                        </Typography>
                        <Typography variant="body1" component="p">
                            {waypoint.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container justify={"space-around"}>
                        <IconButton color="primary" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton color="primary" onClick={() => setShowAddDialog(true)}>
                            <CommentIcon/>
                        </IconButton>
                        <AddDescriptionDialog
                            markerId={waypoint.id}
                            open={showAddDialog}
                            handleClose={() => setShowAddDialog(false)}
                        />
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default WaypointCard;