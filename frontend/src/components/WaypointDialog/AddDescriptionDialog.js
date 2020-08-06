import React, {useContext, useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {addDescription} from "../../context/waypoints/waypointActions";
import {WaypointDispatchContext, WaypointStateContext} from "../../context/waypoints/WaypointContext";
import Grid from "@material-ui/core/Grid";


function AddDescriptionDialog({open, handleClose, markerId}) {

    const [description, setDescription] = useState('');
    const {addStatus} = useContext(WaypointStateContext);

    useEffect(() => {
        if (addStatus === 'SUCCESS') {
            setDescription('');
            handleClose();
        }
        // this is important to avoid an error when deploying!!! ...means "ignore" handleClose error
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addStatus]);

    const dispatch = useContext(WaypointDispatchContext);

    function handleSubmit() {
        addDescription(dispatch, description, markerId);
    }

    function handleChange(event) {
        setDescription(event.target.value);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'sm'}
            fullWidth={true}
        >
            <DialogTitle>Waypoint Description</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth={true}
                        multiline={true}
                        label="Description"
                        value={description}
                        onChange={handleChange}
                        margin="normal"
                        error={description.length < 5}
                        helperText={'min length 5'}
                    />
                </form>
                {addStatus === 'PENDING' && <CircularProgress/>}
                {addStatus === 'FAILED' && (
                    <Typography variant="body1" component="p">
                        Add description failed...
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Grid container direction={"row"} justify={"space-around"}>
                    <Grid item>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={description.length < 5}
                            onClick={handleSubmit}
                            color="primary"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default AddDescriptionDialog;