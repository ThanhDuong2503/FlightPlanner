import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
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
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import {UpdateThemeContext} from "../../context/theme/UpdateThemeContext";
import Avatar from "@material-ui/core/Avatar";
import AppBarButton from "./AppBarButton";
import {Link} from "react-router-dom";
import SettingsButton from "./SettingsButton";
import ResetWaypointsDialog from "../WaypointDialog/ResetWaypointsDialog";


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

    // for ResetWaypointsDialog
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const openResetDialog = () => {
        setShowDeleteDialog(true);
    };
    const closeResetDialog = () => {
        setShowDeleteDialog(false);
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
                        <Link to="/waypoints" style={{textDecoration: "none"}}>
                            <AppBarButton buttonIcon={<PanoramaOutlinedIcon/>}/>
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
                                <img src="images/AeroPathLogoSmall.png" alt="appLogo"/>
                            </Grid>
                            <Grid item>
                                {userData && <Avatar alt="profile picture" src={userData.avatarUrl}/>}
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {userData && userData.displayName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <SettingsButton
                                    buttonIcon={<Brightness2OutlinedIcon/>}
                                    onClickAction={switchMode}
                                    buttonName={"Switch Mode"}
                                />
                            </Grid>
                            <Grid item>
                                <SettingsButton
                                    buttonIcon={<DeleteForeverOutlinedIcon/>}
                                    onClickAction={openResetDialog}
                                    buttonName={"Reset all Waypoints"}
                                />
                            </Grid>

                            <ResetWaypointsDialog
                                openDialog={showDeleteDialog}
                                closeDialog={closeResetDialog}
                            />

                            <Grid item>
                                {authStatus === "SUCCESS" && (
                                    <SettingsButton
                                        buttonIcon={<ExitToAppOutlinedIcon/>}
                                        onClickAction={() => {
                                            dispatch({type: LOGOUT});
                                            removeJWTToken();
                                        }}
                                        buttonName={"Logout Profile"}
                                    />
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
