import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";


function ResetWaypointsDialog({openDialog, closeDialog}) {

    return (
        <Dialog
            open={openDialog}
            onClose={closeDialog}
        >
            <DialogTitle>{"Do you really want to DELETE ALL WAYPOINTS?"}</DialogTitle>
            <DialogActions>
                <Grid container direction={"row"} justify={"space-around"}>
                    <Grid item>
                        <Button onClick={closeDialog} color="primary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={closeDialog} color="primary" autoFocus>
                            DELETE
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default ResetWaypointsDialog;