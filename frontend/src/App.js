import React, {useContext, useEffect, useState} from "react";
import {Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserContextProvider, {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/jwt-utils";
import WeatherPage from "./pages/WeatherPage";
import MapPage from "./pages/MapPage";
import {createMuiTheme, ThemeProvider,} from '@material-ui/core/styles';
import {UpdateThemeContext} from "./context/theme/UpdateThemeContext";
import GitHubCallbackPage from "./pages/GitHubCallback";
import WaypointsPage from "./pages/WaypointsPage";
import {DarkThemeContext} from "./context/theme/DarkThemeContext";
import RegistrationPage from "./pages/RegistrationPage";
import WaypointContextProvider from "./context/waypoints/WaypointContextProvider";
import WaypointDetailPage from "./pages/WaypointDetailPage";

function Navigation() {

    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({type: LOGIN_SUCCESS, payload: getDecodedJWTToken()});
        } else {
            dispatch({type: LOGIN_FAILED});
        }
    }, [dispatch]);

    return (
        // Routing to all pages
        <Switch>
            <Route path="/login" component={LoginPage} exact/>
            <Route path="/registration" component={RegistrationPage} exact/>
            <PrivateRoute path="/" component={MainPage} exact/>
            <PrivateRoute path="/map" component={MapPage} exact/>
            <PrivateRoute path="/weather" component={WeatherPage} exact/>
            <PrivateRoute path="/waypoints" component={WaypointsPage} exact/>
            <PrivateRoute path="/waypoints/:id" component={WaypointDetailPage} exact/>
            <Route path="/oauth/github" component={GitHubCallbackPage} exact/>
        </Switch>
    );
}

function App() {

    // dark mode & theming
    const [darkMode, setDarkMode] = useState(true);

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                light: '#0487aa',
                main: '#06C1F3',
                dark: '#37cdf5',
                contrastText: '#fff'
            },
            secondary: {
                light: '#002643',
                main: '#003760',
                dark: '#335f7f',
                contrastText: '#fff'
            },
            text: {
                primary: "#06C1F3",
                secondary: "#06C1F3",
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <UpdateThemeContext.Provider value={() => setDarkMode(!darkMode)}>
                <DarkThemeContext.Provider value={darkMode}>
                    <div style={{height: "100%", backgroundColor: darkMode ? "#3D3F40" : "#E8F8FF", overflowY: "auto"}}>
                        <UserContextProvider>
                            <WaypointContextProvider>
                                <Navigation/>
                            </WaypointContextProvider>
                        </UserContextProvider>
                    </div>
                </DarkThemeContext.Provider>
            </UpdateThemeContext.Provider>
        </ThemeProvider>
    );
}

export default App;
