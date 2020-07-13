import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserContextProvider, {
  LOGIN_SUCCESS,
} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import { UserDispatchContext } from "./context/user/UserContext";
import { getDecodedJWTToken, isJWTTokenValid } from "./utils/jwt-utils";
import WeatherPage from "./pages/WeatherPage";
import MapPage from "./pages/MapPage";

function Navigation() {
  const dispatch = useContext(UserDispatchContext);

  useEffect(() => {
    if (isJWTTokenValid()) {
      dispatch({ type: LOGIN_SUCCESS, payload: getDecodedJWTToken() });
    }
  }, [dispatch]);

  return (
        <Switch>
            <Route path="/login" component={LoginPage} exact></Route>
            <PrivateRoute path="/" component={MainPage} exact></PrivateRoute>
            <PrivateRoute path="/map" component={MapPage} exact></PrivateRoute>
            <PrivateRoute path="/weather" component={WeatherPage} exact></PrivateRoute>
        </Switch>
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
