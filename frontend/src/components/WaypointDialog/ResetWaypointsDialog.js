import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import {deleteAllWaypoints} from "../../utils/waypoints-utils";
import ConfirmResetDialog from "./ConfirmResetDialog";
import {useHistory} from 'react-router-dom';


function ResetWaypointsDialog({openDialog, closeDialog}) {

    const history = useHistory();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const openConfirmDialog = () => {
        setShowConfirmDialog(true);
    };
    const closeConfirmDialog = () => {
        setShowConfirmDialog(false);
        history.push(`/login`);
    };

    function resetAllWaypoints(){
        deleteAllWaypoints();
        openConfirmDialog();
    }

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
                        <Button onClick={resetAllWaypoints} color="primary" autoFocus>
                            Delete
                        </Button>
                    </Grid>
                    <ConfirmResetDialog
                        openConfirmDialog={showConfirmDialog}
                        closeConfirmDialog={closeConfirmDialog}
                    />
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default ResetWaypointsDialog;