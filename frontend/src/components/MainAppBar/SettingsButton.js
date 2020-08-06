import React from "react";
import Button from "@material-ui/core/Button";
import "./SettingsButton.css";

function SettingsButton({buttonIcon, onClickAction, buttonName}) {
    return (
        <Button
            className={"SettingsButton"}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={buttonIcon}
            onClick={onClickAction}>
            {buttonName}</Button>
    )
}

export default SettingsButton;