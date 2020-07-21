import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #BF600B 30%, #02213F 60%)",
        color: "white"
    },
});

export function GithubLoginButton() {

    const classes = useStyles();

    const [gitHubLoginUrl, setGitHubLoginUrl] = useState("");

    useEffect(() => {
        fetch("/auth/login/github/url")
            .then(response => response.text())
            .then(data => setGitHubLoginUrl(data))
    }, [])

    return <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        fullWidth
        startIcon={<GitHubIcon/>}
        onClick={() => {
            window.location = gitHubLoginUrl
        }}
    >
        Login with GitHub
    </Button>
}