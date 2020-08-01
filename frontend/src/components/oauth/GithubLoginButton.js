import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        background: "linear-gradient(45deg, #1b7aaa 30%, #02213F 60%)",
        opacity: "80%",
        color: "white",
        boxShadow: '5px 8px rgba(0, 41, 66, .9)'
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