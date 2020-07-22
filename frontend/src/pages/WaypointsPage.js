import React, {useContext, useEffect, useState} from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import WaypointCard from "../components/WaypointCard/WaypointCard";
import AddWaypointDialog from "../components/WaypointDialog/AddWaypointDialog";
import {WaypointStateContext,WaypointDispatchContext} from "../context/waypoints/WaypointContext";
import {fetchWaypoints} from "../context/waypoints/waypointActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from "@material-ui/core/Button";


function WaypointsPage() {

    const [showAddDialog, setShowAddDialog] = useState(false);

    const { waypoints, fetchStatus } = useContext(WaypointStateContext);
    const dispatch = useContext(WaypointDispatchContext);

    useEffect(() => {
        if (!fetchStatus) {
            fetchWaypoints(dispatch);
        }
    }, [fetchStatus, dispatch]);

    return (
        <div>
            <MainAppBar></MainAppBar>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowAddDialog(true)}
            >
                Add Waypoint
            </Button>

            <AddWaypointDialog
                open={showAddDialog}
                handleClose={() => setShowAddDialog(false)}
            />
            {fetchStatus === 'PENDING' && <CircularProgress />}
            {fetchStatus === 'FAILED' && (
                <Typography variant="body1" color="error" component="p">
                    Fetch Waypoints failed
                </Typography>
            )}
            <Grid container justify={'center'}>
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