import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  UserDispatchContext,
  UserStateContext,
} from "../../context/user/UserContext";
import { LOGOUT } from "../../context/user/UserContextProvider";
import { removeJWTToken } from "../../utils/jwt-utils";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  title: {
    // flexGrow: 1,
  },
}));

function MainAppBar() {
  const classes = useStyles();
  const { authStatus, userData } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Button variant="contained" color="default" startIcon={<HomeOutlinedIcon />}>Home</Button>
        <Button variant="contained" color="default" startIcon={<ExploreOutlinedIcon />}>Map</Button>
        <Button variant="contained" color="default" startIcon={<CloudOutlinedIcon />}>Weather</Button>

        <div>
          <Button variant="contained" color="default" startIcon={<SettingsOutlinedIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Settings
          </Button>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
            <Typography variant="h6" className={classes.title}>
              Hello {userData && userData.sub}
            </Typography>

            <MenuItem onClick={handleClose}>Switch Mode</MenuItem>

            {authStatus === "SUCCESS" && (
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => {
                      dispatch({ type: LOGOUT });
                      removeJWTToken();
                    }}
                >
                  Logout
                </Button>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
