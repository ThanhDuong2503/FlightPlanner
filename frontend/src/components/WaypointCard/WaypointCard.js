import React, {useContext} from 'react';
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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        margin: 10,
        backgroundColor: '#3C5E79',
        '&:hover': {
            backgroundColor: '#04b9c9',
        },
    },
});


function WaypointCard({waypoint}) {

    const dispatch = useContext(WaypointDispatchContext);
    const classes = useStyles();
    const history = useHistory();

    function handleDelete(event) {
        event.stopPropagation();
        removeWaypoint(dispatch, waypoint.id)
    }

    return (
        <Grid item xs={10} sm={6} lg={3}>
            <Card
                className={classes.root}
                onClick={() => history.push(`/waypoints/${waypoint.id}`)}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="waypoint picture"
                        height="200"
                        image={waypoint.imageUrl}
                        title="waypoint picture"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2" color={"textPrimary"}>
                            {waypoint.waypointName} <br/>
                        </Typography>
                        <Typography variant="subtitle1" component="p" color={"textSecondary"}>
                            {waypoint.waypointAddress} <br/>
                        </Typography>
                        <Typography variant="body2" component="p" color={"textPrimary"}>
                            {waypoint.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default WaypointCard;