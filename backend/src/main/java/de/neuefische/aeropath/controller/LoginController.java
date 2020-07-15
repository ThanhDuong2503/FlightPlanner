package de.neuefische.aeropath.controller;

import de.neuefische.aeropath.config.GithubAuthConfig;
import de.neuefische.aeropath.model.LoginData;
import de.neuefische.aeropath.model.oauth.GithubLoginData;
import de.neuefische.aeropath.security.JWTUtils;
import de.neuefische.aeropath.service.GithubAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
@RequestMapping("auth/login")
@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final GithubAuthService githubAuthService;
    private final GithubAuthConfig githubAuthConfig;


    public LoginController(AuthenticationManager authenticationManager, JWTUtils jwtUtils, GithubAuthService githubAuthService, GithubAuthConfig githubAuthConfig) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.githubAuthService = githubAuthService;
        this.githubAuthConfig = githubAuthConfig;
    }

    @PostMapping
    public String login(@RequestBody LoginData data){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword()));
            return jwtUtils.createToken(new HashMap<>(), data.getUsername());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }

    @PostMapping("github")
    public String loginWithGithub(@RequestBody GithubLoginData data){
        return githubAuthService.login(data.getCode());
    }

    @GetMapping("github/url")
    private String getGithubLoginUrl(){
        return githubAuthConfig.getLoginUrl();
    }
}
