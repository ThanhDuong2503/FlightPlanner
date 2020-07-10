import React, { useContext, useState } from "react";
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
import { performLogin } from "../utils/auth-utils";
import { Redirect } from "react-router-dom";
import { getDecodedJWTToken, setJWTToken } from "../utils/jwt-utils";
import { Grid, makeStyles } from '@material-ui/core';
import "./LoginPage.css";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(5),
    },
}));


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useContext(UserDispatchContext);

  const classes = useStyles();

  function login() {
    dispatch({ type: LOGIN });
    performLogin(username, password)
      .then((data) => {
        setJWTToken(data);
        const userData = getDecodedJWTToken();
        dispatch({ type: LOGIN_SUCCESS, payload: userData });
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  }

  const { authStatus } = useContext(UserStateContext);
  if (authStatus === "SUCCESS") {
    return <Redirect to={"/"} />;
  }

  return (
      <div className="background-image">
      <Grid
          className={classes.gridContainer}
          container
          alignContent="center"
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
              <Button onClick={login} variant="outlined" color="primary">Login</Button>
              <p>- or -</p>
              <Button onClick={login} variant="outlined" color="primary">Login via GitHub</Button>
              <Button onClick={login} variant="outlined" color="primary">Login via Google</Button>
              <Button onClick={login} variant="outlined" color="primary">Login via Facebook</Button>
          </Grid>
      </Grid>
      </div>
  );
}

export default LoginPage;
