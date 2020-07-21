import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #BF600B 30%, #02213F 60%)",
        color: "white"
    },
});

function LoginPageButton({onClickAction, buttonIcon, buttonName, pathURL, setDisabled}) {

    const classes = useStyles();

    return (
        <Grid item xs={10}>
            <Link to={pathURL} style={{textDecoration: "none"}}>
                <Button className={classes.button}
                        onClick={onClickAction}
                        variant="contained" fullWidth
                        startIcon={buttonIcon}
                        disabled={setDisabled}
                >{buttonName}</Button>
            </Link>
        </Grid>
    )
}

export default LoginPageButton;