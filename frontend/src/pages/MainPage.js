import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import MainPageButton from "../components/ButtonBase/MainPageButton";
import Grid from "@material-ui/core/Grid";

function MainPage() {
    return (
        <div>
            <MainAppBar/>
            <Grid container direction={"column"} spacing={1} >
                <Grid item>
                    <MainPageButton backgroundImageURL={`url("/images/MapButton.jpg")`}
                                    buttonName="Map"
                                    pathURL="/map"/>
                </Grid>
                <Grid item>
                    <MainPageButton backgroundImageURL={`url("/images/WaypointsButton.png")`}
                                    buttonName="Waypoints"
                                    pathURL="/waypoints"/>
                </Grid>
                <Grid item>
                    <MainPageButton backgroundImageURL={`url("/images/WeatherButton.jpg")`}
                                    buttonName="Weather"
                                    pathURL="/weather"/>
                </Grid>
            </Grid>
        </div>
    )
}

export default MainPage;