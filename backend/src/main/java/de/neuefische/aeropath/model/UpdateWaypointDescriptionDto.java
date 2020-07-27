package de.neuefische.aeropath.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateWaypointDescriptionDto {
    @Size(min = 5, message = "description min. 5 characters")
    private String description;
}
