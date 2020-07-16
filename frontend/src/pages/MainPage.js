import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import MapButton from "../components/ButtonBase/MapButton";
import WaypointsButton from "../components/ButtonBase/WaypointsButton";
import WeatherButton from "../components/ButtonBase/WeatherButton";

function MainPage() {
    return (
        <div>
            <MainAppBar></MainAppBar>
            <h1>here comes the Main Page</h1>
            <MapButton></MapButton>
            <WaypointsButton></WaypointsButton>
            <WeatherButton></WeatherButton>
        </div>
    )
}

export default MainPage;