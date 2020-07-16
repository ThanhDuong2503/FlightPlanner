import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import MapButton from "../components/ButtonBase/MapButton";
import WaypointsButton from "../components/ButtonBase/WaypointsButton";
import WeatherButton from "../components/ButtonBase/WeatherButton";
import Grid from "@material-ui/core/Grid";

function MainPage() {
    return (
        <div>
            <MainAppBar></MainAppBar>
            <Grid container direction={"column"} spacing={1} >
                <Grid item>
                    <MapButton></MapButton>
                </Grid>
                <Grid item>
                    <WaypointsButton></WaypointsButton>
                </Grid>
                <Grid item>
                    <WeatherButton></WeatherButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default MainPage;