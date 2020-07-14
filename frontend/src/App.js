import React, {useContext, useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserContextProvider, {
    LOGIN_SUCCESS,
} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/jwt-utils";
import WeatherPage from "./pages/WeatherPage";
import MapPage from "./pages/MapPage";
import {createMuiTheme, ThemeProvider,} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {UpdateThemeContext} from "./context/theme/UpdateThemeContext";

function Navigation() {

    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({type: LOGIN_SUCCESS, payload: getDecodedJWTToken()});
        }
    }, [dispatch]);

    return (
        // Routing to all pages
        <Switch>
            <Route path="/login" component={LoginPage} exact></Route>
            <PrivateRoute path="/" component={MainPage} exact></PrivateRoute>
            <PrivateRoute path="/map" component={MapPage} exact></PrivateRoute>
            <PrivateRoute path="/weather" component={WeatherPage} exact></PrivateRoute>
        </Switch>
    );
}

function App() {

    // dark mode & theming
    const [darkMode, setDarkMode] = React.useState(true);

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                light: '#478B97',
                main: '#025964',
                dark: '#d3ecee',
            },
            secondary: {
                light: '#F38765',
                main: '#33ab9f',
                dark: '#79EFA1',
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <UpdateThemeContext.Provider value={() => setDarkMode(!darkMode)}>
                <Paper style={{height: "100vh"}}>
                    <UserContextProvider>
                        <Navigation/>
                    </UserContextProvider>
                </Paper>
            </UpdateThemeContext.Provider>
        </ThemeProvider>
    );
}

export default App;
