import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        justifyContent: "center",
        height: 180,
        marginTop: 20,
    },
    image: {
        borderRadius: "30px",
        boxShadow: "7px 7px 20px #000000, -5px -5px 10px #ffffff",
        // boxShadow: "7px 8px rgba(0, 0, 0, 0.2)",
        position: 'relative',
        height: 180,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 180,
        },
        '&:hover, &$focusVisible': {
            boxShadow: "7px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        borderRadius: "30px",
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
        borderRadius: "30px",
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

function MainPageButton({backgroundImageURL, buttonName, pathURL}) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: "40%",
                }}
            >
                <Link to={pathURL}>
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: backgroundImageURL,
              }}
          />
                    <span className={classes.imageBackdrop}/>
                    <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
              {buttonName}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                </Link>
            </ButtonBase>
        </div>
    );
}

export default MainPageButton;