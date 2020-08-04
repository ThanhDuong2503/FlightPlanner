import React, {useState} from "react";
import {useHistory} from "react-router";
import {addNewUser} from "../../utils/auth-utils";
import RegistrationInputField from "./RegistrationInputField";
import LoginPageButton from "../LoginPageButtons/LoginPageButton";
import ListAltIcon from "@material-ui/icons/ListAlt";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import {Grid} from "@material-ui/core";


function RegistrationForm() {

    const history = useHistory();
    const [passwordState, setPasswordState] = useState("");
    const [registerState, setRegisterState] = useState({
        firstName: "",
        username: "",
        password: "",
        email: "",
    })
    const validation =
        registerState.username.length > 5 &&
        registerState.password.length > 5 &&
        passwordState.length > 0 &&
        registerState.password === passwordState &&
        registerState.email.length > 0 &&
        ((registerState.email.includes("@")) &&
            (registerState.email.includes(".de") ||
                registerState.email.includes(".com") ||
                registerState.email.includes(".net")))


    function handleChange(event) {
        const {name, value} = event.target;
        setRegisterState({
            ...registerState,
            [name]: value
        });
    }

    function handleConfirmPassword(event) {
        setPasswordState(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addNewUser(registerState)
            .catch((e) => console.error(e))
            .then(() => history.push(`/login`))
    }

    return (
        <>
            <RegistrationInputField
                onChangeAction={handleChange}
                idInput="firstname"
                labelInput="Firstname"
                nameInput="firstName"
            />
            <RegistrationInputField
                onChangeAction={handleChange}
                idInput="username"
                labelInput="Username"
                nameInput="username"
                errorInput={registerState.username.length < 6 && registerState.username.length > 0}
                helperInput={registerState.username.length > 0 && registerState.username.length < 6 && "min. 6 characters"}
            />
            <RegistrationInputField
                onChangeAction={handleChange}
                idInput="password"
                labelInput="Password"
                nameInput="password"
                typeInput="password"
                errorInput={registerState.password.length < 6 && registerState.password.length > 0}
                helperInput={registerState.password.length > 0 && registerState.password.length < 6 && "min. 6 characters"}
            />
            <RegistrationInputField
                onChangeAction={handleConfirmPassword}
                idInput="password2"
                labelInput="repeat Password"
                nameInput="password2"
                typeInput="password"
                errorInput={passwordState.length > 0 && registerState.password !== passwordState}
                helperInput={passwordState.length > 0 && registerState.password !== passwordState && "Password does not match"}
            />
            <RegistrationInputField
                onChangeAction={handleChange}
                idInput="email"
                labelInput="E-Mail"
                nameInput="email"
                typeInput="email"
                errorInput={registerState.email.length > 0 && ((!registerState.email.includes("@")) || !(registerState.email.includes(".de") || registerState.email.includes(".com") || registerState.email.includes(".net")))}
                helperInput={registerState.email.length > 0 && ((!registerState.email.includes("@")) || !(registerState.email.includes(".de") || registerState.email.includes(".com") || registerState.email.includes(".net"))) && "not a valid E-Mail address"}
            />
            <Grid container spacing={1} direction={"column"} alignContent={"center"}>
                <Grid item xs={10}>
                    <LoginPageButton
                        onClickAction={handleSubmit}
                        setDisabled={!validation}
                        buttonIcon={<ListAltIcon/>}
                        buttonName="Register"
                    />
                </Grid>
                <Grid item xs={10}>
                    <LoginPageButton
                        onClickAction={history.goBack}
                        buttonIcon={<VpnKeyOutlinedIcon/>}
                        buttonName="Back to Login"
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default RegistrationForm;