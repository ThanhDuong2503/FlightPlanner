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
                        <h1>Welcome to AeroPath</h1>
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

                        <Button onClick={login} variant="contained" size={"medium"} color="primary">Login</Button>

                        <p>- or -</p>

                        <Grid container spacing={1} direction={"column"} alignItems={"center"}>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="primary" startIcon={<GitHubIcon />}>Login with GitHub</Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="primary" startIcon={<TwitterIcon />}>Login with Twitter</Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={login} variant="contained" fullWidth color="primary" startIcon={<FacebookIcon />}>Login with Facebook</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LoginPage;
