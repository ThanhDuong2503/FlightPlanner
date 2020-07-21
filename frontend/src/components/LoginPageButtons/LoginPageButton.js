import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #FF6100 30%, #033464 60%)",
        color: "white"
    },
});

function LoginPageButton({onClickAction, buttonIcon, buttonName}) {

    const classes = useStyles();

    return (
        <Grid item xs={10}>
            <Button className={classes.button} onClick={onClickAction} variant="contained" fullWidth
                    startIcon={buttonIcon}>{buttonName}</Button>
        </Grid>
    )
}

export default LoginPageButton;