import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function ConfirmResetDialog({openConfirmDialog, closeConfirmDialog}) {

    return (
        <Dialog
            open={openConfirmDialog}
            onClose={closeConfirmDialog}
        >
            <DialogTitle>{"All Waypoints deleted. Returning to Main Page."}</DialogTitle>
            <DialogActions>
                <Grid container direction={"row"} justify={"center"}>
                    <Button onClick={closeConfirmDialog} color="primary">
                        OK
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmResetDialog;