package de.neuefische.aeropath.controller;
import de.neuefische.aeropath.model.AddWaypointDto;
import de.neuefische.aeropath.model.Waypoint;
import de.neuefische.aeropath.service.WaypointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/waypoints")
public class WaypointController {

    private final WaypointService waypointService;

    @Autowired
    public WaypointController(WaypointService waypointService) {
        this.waypointService = waypointService;
    }

    @GetMapping
    public List<Waypoint> getWaypoints(Principal principal) {
        return waypointService.getAll(principal.getName());
    }

    @PutMapping
    public Waypoint addWaypoint(@RequestBody @Valid AddWaypointDto data, Principal principal){
        return waypointService.add(data.getDescription(), principal.getName());
    }

    @DeleteMapping("{id}")
    public void deleteWaypoint(@PathVariable String id){
        waypointService.deleteWaypoint(id);
    }

    @GetMapping("{id}")
    public Waypoint getWaypointById(@PathVariable String id) {
        Optional<Waypoint> waypointOptional = waypointService.getWaypoint(id);
        if (waypointOptional.isPresent()) {
            return waypointOptional.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Waypoint_ID " + id + " does not exist");
    }

}
