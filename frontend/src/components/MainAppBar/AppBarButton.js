import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #1b7aaa 30%, #02213F 60%)",
        color: "white",
    },
});

function AppBarButton ({pathURL, buttonIcon, buttonName, onClickAction}) {

    const classes = useStyles();

    return (
        <Grid item xs={2}>
            <Link to={pathURL} style={{textDecoration: "none"}}>
                <Button className={classes.button} variant="contained" fullWidth startIcon={buttonIcon} onClick={onClickAction}>
                    {buttonName}
                </Button>
            </Link>
        </Grid>
    )
}

export default AppBarButton;