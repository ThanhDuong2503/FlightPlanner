package de.neuefische.aeropath.service;
import de.neuefische.aeropath.db.WaypointMongoDb;
import de.neuefische.aeropath.model.Waypoint;
import de.neuefische.aeropath.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WaypointService {
    private final WaypointMongoDb waypointDb;
    private final IdUtils idUtils;

    @Autowired
    public WaypointService(WaypointMongoDb waypointDb, IdUtils idUtils) {
        this.waypointDb = waypointDb;
        this.idUtils = idUtils;
    }

    public Iterable<Waypoint> getAll(){
        return waypointDb.findAll();
    }

    public Waypoint add(String description, String user) {
        Waypoint waypoint = new Waypoint();
        waypoint.setId(idUtils.generateRandomId());
        waypoint.setDescription(description);
        waypoint.setUser(user);
        // add more Waypoint model props here if needed
        return waypointDb.save(waypoint);
    }

    public void deleteWaypoint(String id) {
        waypointDb.deleteById(id);
    }

    public Optional<Waypoint> getWaypoint(String id) {
        return waypointDb.findById(id);
    }

}
