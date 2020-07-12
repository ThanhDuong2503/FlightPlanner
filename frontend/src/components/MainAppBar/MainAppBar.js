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

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function MainAppBar() {
  const classes = useStyles();
  const { authStatus, userData } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Welcome to AeroPath {userData && userData.sub}
        </Typography>
        <Button variant="contained" color="default" startIcon={<HomeOutlinedIcon />}>Home</Button>
        <Button variant="contained" color="default" startIcon={<ExploreOutlinedIcon />}>Map</Button>
        <Button variant="contained" color="default" startIcon={<CloudOutlinedIcon />}>Weather</Button>
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
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
