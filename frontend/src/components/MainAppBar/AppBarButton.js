import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        display: "flex",
        background: "linear-gradient(170deg, #1b7aaa 30%, #02213F 60%)",
        color: "white",
        boxShadow: "5px 5px 15px #000000, -3px -3px 6px #ffffff",
        borderRadius: "10px",
        paddingLeft: "2em",
    },
});

function AppBarButton({buttonIcon, onClickAction}) {

    const classes = useStyles();

    return (
        <Button className={classes.button} variant="contained" fullWidth startIcon={buttonIcon} onClick={onClickAction}>
        </Button>
    )
}

export default AppBarButton;