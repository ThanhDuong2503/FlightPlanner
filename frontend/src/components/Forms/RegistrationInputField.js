import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    inputField: {
        width: "40%",
    },
}))

function RegistrationInputField ({onChangeAction, nameInput, typeInput, labelInput, idInput, errorInput, helperInput}) {

    const classes = useStyles();

    return (
        <TextField
            className={classes.inputField}
            margin={"normal"}
            onChange={onChangeAction}
            variant="outlined"
            required
            fullWidth
            name={nameInput}
            type={typeInput}
            label={labelInput}
            id={idInput}
            error={errorInput}
            helperText={helperInput}
        />
    )
}

export default RegistrationInputField;