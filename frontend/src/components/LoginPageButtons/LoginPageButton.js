import Button from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(170deg, #1b7aaa 30%, #02213F 60%)",
        opacity: "80%",
        color: "white",
        boxShadow: "5px 5px 10px #586166, -5px -5px 10px #ffffff",
        borderRadius: "10px",
    },
});

function LoginPageButton({onClickAction, buttonIcon, buttonName, setDisabled}) {

    const classes = useStyles();

    return (
        <Button className={classes.button}
                onClick={onClickAction}
                variant="contained" fullWidth
                startIcon={buttonIcon}
                disabled={setDisabled}
        >{buttonName}
        </Button>
    )
}

export default LoginPageButton;