import React from "react";
import Button from "@material-ui/core/Button";

function AppBarButton (props) {
    return (
        <Button variant="contained" color="primary" fullWidth startIcon={props.icon}>
            {props.name}
            </Button>
    )
}

export default AppBarButton;