import React, { useEffect, useState } from 'react';
import MainAppBar from "../components/MainAppBar/MainAppBar";
import { useParams } from 'react-router-dom';
import {fetchWaypoint} from "../utils/waypoints-utils";
import WaypointCard from "../components/WaypointCard/WaypointCard";

function WaypointDetailPage() {

    const { id } = useParams();

    const [waypoint, setWaypoint] = useState();
    useEffect(() => {
        fetchWaypoint(id)
            .then((data) => setWaypoint(data))
            .catch((e) => console.error(e));
    }, [id]);

    return (
        <div>
            <MainAppBar></MainAppBar>
            {waypoint && <WaypointCard waypoint={waypoint} />}}
        </div>
    )
}

export default WaypointDetailPage;