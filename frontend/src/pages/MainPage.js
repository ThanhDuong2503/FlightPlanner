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
                                buttonName="Click on the Map to add Waypoints"
                                pathURL="/map"/>

                <MainPageButton backgroundImageURL={`url("/images/WeatherButton.jpg")`}
                                buttonName="Check current Weather"
                                pathURL="/weather"/>

                <MainPageButton backgroundImageURL={`url("/images/WaypointsButton.jpg")`}
                                buttonName="See Summary of all Waypoints"
                                pathURL="/waypoints"/>
            </Grid>
        </div>
    )
}

export default MainPage;