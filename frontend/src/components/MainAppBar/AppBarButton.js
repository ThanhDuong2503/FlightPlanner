import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

function AppBarButton ({pathURL, buttonIcon, buttonName}) {
    return (
        <Grid item xs={2}>
            <Link to={pathURL} style={{textDecoration: "none"}}>
                <Button variant="contained" color="primary" fullWidth startIcon={buttonIcon}>
                    {buttonName}
                </Button>
            </Link>
        </Grid>
    )
}

export default AppBarButton;