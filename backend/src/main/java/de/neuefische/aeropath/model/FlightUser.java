package de.neuefische.aeropath.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class FlightUser {

    @Id
    private String username;
    private String password;
    private String role;
    private String displayName;
    private String avatarUrl;
    private UserSource source;
}
