import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserContextProvider, {
  LOGIN_SUCCESS,
} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import { UserDispatchContext } from "./context/user/UserContext";
import { getDecodedJWTToken, isJWTTokenValid } from "./utils/jwt-utils";

function Navigation() {
  const dispatch = useContext(UserDispatchContext);

  useEffect(() => {
    if (isJWTTokenValid()) {
      dispatch({ type: LOGIN_SUCCESS, payload: getDecodedJWTToken() });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact>
                 <LoginPage></LoginPage>
            </Route>
            <PrivateRoute path="/" component={MainPage} exact></PrivateRoute>
        </Switch>
    </BrowserRouter>
  );
}

function App() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}

export default App;
