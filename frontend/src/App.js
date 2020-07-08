import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider, {
  LOGIN_SUCCESS,
} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import { UserDispatchContext } from "./context/user/UserContext";
import { getDecodedJWTToken, isJWTTokenValid } from "./utils/jwt-utils";
import LoginAppBar from "./components/LoginAppBar/LoginAppBar";

function Navigation() {
  const dispatch = useContext(UserDispatchContext);

  useEffect(() => {
    if (isJWTTokenValid()) {
      dispatch({ type: LOGIN_SUCCESS, payload: getDecodedJWTToken() });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <LoginAppBar />
      <Switch>
        {/*<PrivateRoute path="/idea/:id" component={IdeaDetails} exact></PrivateRoute>*/}
        {/*<PrivateRoute path="/" component={IdeaOverview} exact></PrivateRoute>*/}
        <Route path="/login" exact>
          <LoginPage></LoginPage>
        </Route>
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
