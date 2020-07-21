import React from "react";

import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import RegistrationForm from "../components/Forms/RegistrationForm";
import "./LoginPage.css";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        overflow: "scroll",
    },
    image: {
        margin: "20px 0px",
    },

    welcome: {
        color: "#2fe1fc",
    }

}))

function RegistrationPage() {

    const classes = useStyles();

    return (
        <div className="background-image">
            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <img className={classes.image} src={"/images/AeroPathLogo.png"} alt="appLogo"/>
                    </Grid>
                    <h2 className={classes.welcome}>Welcome to AeroPath</h2>
                    <RegistrationForm/>
                </Grid>
            </div>
        </div>
    )
}

export default RegistrationPage;