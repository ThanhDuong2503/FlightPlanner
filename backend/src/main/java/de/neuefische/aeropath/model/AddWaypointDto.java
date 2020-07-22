package de.neuefische.aeropath.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddWaypointDto {
    @Size(min = 5, message = "description min. 5 characters")
    private String description;
}
