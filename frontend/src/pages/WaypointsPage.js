import React, {useContext, useEffect} from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import WaypointCard from "../components/WaypointCard/WaypointCard";
import {WaypointStateContext,WaypointDispatchContext} from "../context/waypoints/WaypointContext";
import {fetchWaypoints} from "../context/waypoints/waypointActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import "./WaypointsPage.css";


function WaypointsPage() {

    const { waypoints, fetchStatus } = useContext(WaypointStateContext);
    const dispatch = useContext(WaypointDispatchContext);

    // fetch all waypoints of the active user from BackEnd
    useEffect(() => {
            fetchWaypoints(dispatch);
    }, [dispatch]);

    return (
        <div className={"waypointsPage"}>
            <MainAppBar></MainAppBar>

            {fetchStatus === 'PENDING' && <CircularProgress />}
            {fetchStatus === 'FAILED' && (
                <Typography variant="body1" color="error" component="p">
                    Fetch Waypoints failed
                </Typography>
            )}
            <Grid container spacing={1} direction={"column"} alignContent={"center"}>
                {waypoints.map((waypoint) => (
                    <WaypointCard
                        key={waypoint.id}
                        waypoint={waypoint}
                        onDeleteSuccess={() => console.log('delete success')}
                    />
                ))}
            </Grid>
        </div>
    )
}

export default WaypointsPage;