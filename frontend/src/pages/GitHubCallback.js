import React, {useContext, useEffect} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import {performLoginWithGithub} from "../utils/auth-utils";
import {getDecodedJWTToken, setJWTToken} from "../utils/jwt-utils";
import {LOGIN_FAILED, LOGIN_SUCCESS} from "../context/user/UserContextProvider";
import {UserDispatchContext} from "../context/user/UserContext";

export default function GitHubCallbackPage() {

    const location = useLocation()
    const dispatch = useContext(UserDispatchContext);
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        performLoginWithGithub(code).then((data) => {
            setJWTToken(data);
            const userData = getDecodedJWTToken();
            dispatch({type: LOGIN_SUCCESS, payload: userData});
            history.push("/")
        }).catch(() => {
            dispatch({type: LOGIN_FAILED});
        });
    }, [location, dispatch, history]);
    return <div>
        Login with github
    </div>
}