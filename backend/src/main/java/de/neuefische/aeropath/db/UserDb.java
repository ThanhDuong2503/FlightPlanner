package de.neuefische.flightplanner.db;

import de.neuefische.flightplanner.model.FlightUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDb extends PagingAndSortingRepository<FlightUser,String> {
}
