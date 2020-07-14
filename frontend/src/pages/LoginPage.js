import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
    UserDispatchContext,
    UserStateContext,
} from "../context/user/UserContext";
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
} from "../context/user/UserContextProvider";
import {performLogin} from "../utils/auth-utils";
import {Redirect} from "react-router-dom";
import {getDecodedJWTToken, setJWTToken} from "../utils/jwt-utils";
import {Grid, makeStyles} from '@material-ui/core';
import "./LoginPage.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridContainer: {
        paddingTop: theme.spacing(3),
        textAlign: "center",
        maxHeight: 100,
    },
}));


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useContext(UserDispatchContext);

    const classes = useStyles();

    function login() {
        dispatch({type: LOGIN});
        performLogin(username, password)
            .then((data) => {
                setJWTToken(data);
                const userData = getDecodedJWTToken();
                dispatch({type: LOGIN_SUCCESS, payload: userData});
            })
            .catch(() => {
                dispatch({type: LOGIN_FAILED});
            });
    }

    const {authStatus} = useContext(UserStateContext);
    if (authStatus === "SUCCESS") {
        return <Redirect to={"/"}/>;
    }

    return (
        <div className="background-image">
            <div className={classes.root}>
                <Grid container
                      className={classes.gridContainer}
                      justify="center"
                >
                    <Grid item className="loginStyle">
                        <img src="images/AeroPathLogo.png" alt="appLogo"/>

                        <Grid container spacing={1} direction={"column"} alignContent={"center"}>
                            <div className="loginBox">
                                <div>
                                    <TextField
                                        color={"primary"}
                                        label="Username"
                                        type="text"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        color={"primary"}
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                            </div>

                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="secondary"
                                        startIcon={<VpnKeyOutlinedIcon/>}>Login</Button>
                            </Grid>
                            <Grid item xs={10}>
                                <p>- or -</p>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="secondary"
                                        startIcon={<GitHubIcon/>}>Login with GitHub</Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="secondary"
                                        startIcon={<TwitterIcon/>}>Login with Twitter</Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="secondary"
                                        startIcon={<FacebookIcon/>}>Login with Facebook</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LoginPage;
