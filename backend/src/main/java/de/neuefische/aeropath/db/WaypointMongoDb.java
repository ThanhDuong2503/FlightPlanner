package de.neuefische.aeropath.db;

import de.neuefische.aeropath.model.Waypoint;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface WaypointMongoDb extends PagingAndSortingRepository<Waypoint,String> {
}
