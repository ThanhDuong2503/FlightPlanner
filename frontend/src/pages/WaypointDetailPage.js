import React, {useEffect, useState} from 'react';
import MainAppBar from "../components/MainAppBar/MainAppBar";
import {useParams} from 'react-router-dom';
import {fetchWaypoint} from "../utils/waypoints-utils";
import WaypointCard from "../components/WaypointCard/WaypointCard";
import {Grid} from "@material-ui/core";
import "./WaypointDetailPage.css";

function WaypointDetailPage() {

    const {id} = useParams();
    const [waypoint, setWaypoint] = useState();

    useEffect(() => {
        fetchWaypoint(id)
            .then((data) => setWaypoint(data))
            .catch((e) => console.error(e));
    }, [id]);

    return (
        <div className={"waypointDetailPage"}>
            <MainAppBar></MainAppBar>
            <Grid container spacing={1} direction={"column"} alignContent={"center"}>
                {waypoint && <WaypointCard waypoint={waypoint}/>}
            </Grid>
        </div>
    )
}

export default WaypointDetailPage;