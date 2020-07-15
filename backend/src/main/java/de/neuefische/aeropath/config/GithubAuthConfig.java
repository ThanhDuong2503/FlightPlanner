package de.neuefische.aeropath.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GithubAuthConfig {

    @Value("${oauth.github.client.id}")
    private String clientId;
    @Value("${oauth.github.client.secret}")
    private String clientSecret;
    @Value("${oauth.github.redirecturl}")
    private String redirectUrl;


    public String getAccessTokenUrl(String code){
        return "https://github.com/login/oauth/access_token?client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + code;
    }

    public String getUserDataUrl(){
        return "https://api.github.com/user";
    }

    public String getLoginUrl() {
        return "https://github.com/login/oauth/authorize?client_id=" + clientId + "&redirect_uri=" + redirectUrl;
    }
}

