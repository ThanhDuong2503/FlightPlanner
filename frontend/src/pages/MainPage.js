import React from "react";
import MainAppBar from "../components/MainAppBar/MainAppBar";
import MainPageButton from "../components/ButtonBase/MainPageButton";
import Grid from "@material-ui/core/Grid";
import "./MainPage.css";

function MainPage() {
    return (
        <div className={"mainPage"}>
            <MainAppBar/>
            <Grid container direction={"column"} className={"gridContainer"} justify={"space-between"}>
                <MainPageButton backgroundImageURL={`url("/images/MapButton.jpg")`}
                                buttonName="Map"
                                pathURL="/map"/>

                <MainPageButton backgroundImageURL={`url("/images/WaypointsButton.png")`}
                                buttonName="Waypoints"
                                pathURL="/waypoints"/>

                <MainPageButton backgroundImageURL={`url("/images/WeatherButton.jpg")`}
                                buttonName="Weather"
                                pathURL="/weather"/>
            </Grid>
        </div>
    )
}

export default MainPage;