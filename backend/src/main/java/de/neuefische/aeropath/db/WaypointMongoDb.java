package de.neuefische.aeropath.db;

import de.neuefische.aeropath.model.FlightUser;
import de.neuefische.aeropath.model.Waypoint;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface WaypointMongoDb extends PagingAndSortingRepository<Waypoint,String> {
    List<Waypoint> findByUser(String user);
}
