import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #1b7aaa 30%, #02213F 60%)",
        color: "white",
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