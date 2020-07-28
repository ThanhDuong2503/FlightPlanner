package de.neuefische.aeropath.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Waypoint {
    @Id
    private String id;
    private double latitude;
    private double longitude;
    private String description;
    private String placeId;
    private String user;
    private String imageUrl;
}
