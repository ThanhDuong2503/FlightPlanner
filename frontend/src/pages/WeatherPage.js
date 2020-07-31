import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import WeatherContainer from "../components/Weather/WeatherContainer";

function WeatherPage() {
    return (
        <div>
            <MainAppBar/>
            <WeatherContainer/>
        </div>
    )
}

export default WeatherPage;