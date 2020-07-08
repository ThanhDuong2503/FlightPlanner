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

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useContext(UserDispatchContext);

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
    <div>
      <div>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button onClick={login}>Login</Button>
    </div>
  );
}

export default LoginPage;
