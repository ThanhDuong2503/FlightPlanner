import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
    UserDispatchContext,
    UserStateContext,
} from "../../context/user/UserContext";
import {LOGOUT} from "../../context/user/UserContextProvider";
import {removeJWTToken} from "../../utils/jwt-utils";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import {UpdateThemeContext} from "../../context/theme/UpdateThemeContext";
import Avatar from "@material-ui/core/Avatar";
import AppBarButton from "./AppBarButton";
import {Link} from "react-router-dom";
import "./MainAppBar.css";

function MainAppBar() {

    const {authStatus, userData} = useContext(UserStateContext);
    const dispatch = useContext(UserDispatchContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    // for DarkMode Switch button
    const switchDarkMode = useContext(UpdateThemeContext);
    const switchMode = () => {
        switchDarkMode();
        handleClose();
    }
    // for SettingsMenu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"}>
                    <Grid item xs={2}>
                        <Link to="/" style={{textDecoration: "none"}}>
                            <AppBarButton buttonIcon={<HomeOutlinedIcon/>}/>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link to="/map" style={{textDecoration: "none"}}>
                            <AppBarButton buttonIcon={<ExploreOutlinedIcon/>}/>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link to="/weather" style={{textDecoration: "none"}}>
                            <AppBarButton buttonIcon={<CloudOutlinedIcon/>}/>
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        <AppBarButton buttonIcon={<SettingsOutlinedIcon/>}
                                      onClickAction={handleClick}/>
                    </Grid>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Grid container direction={"column"} spacing={1} alignItems={"center"}>
                            <Grid item>
                                {userData && <Avatar alt="profile picture" src={userData.avatarUrl}/>}
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {userData && userData.displayName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" fullWidth className={"MenuButton"}
                                        startIcon={<Brightness2OutlinedIcon/>} onClick={switchMode}>Switch</Button>
                            </Grid>
                            <Grid item>
                                {authStatus === "SUCCESS" && (
                                    <Button
                                        className={"MenuButton"}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        startIcon={<ExitToAppOutlinedIcon/>}
                                        onClick={() => {
                                            dispatch({type: LOGOUT});
                                            removeJWTToken();
                                        }}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Menu>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default MainAppBar;
