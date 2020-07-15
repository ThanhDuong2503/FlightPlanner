package de.neuefische.aeropath.model.oauth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GithubUserData {
    private String login;
    private String avatar_url;
    private String name;
}
