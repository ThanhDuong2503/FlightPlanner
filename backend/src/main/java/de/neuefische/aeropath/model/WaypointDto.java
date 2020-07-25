package de.neuefische.aeropath.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaypointDto {
    private String latitude;
    private String longitude;
}