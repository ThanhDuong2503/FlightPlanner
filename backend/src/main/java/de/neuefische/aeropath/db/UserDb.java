package de.neuefische.aeropath.db;

import de.neuefische.aeropath.model.FlightUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDb extends PagingAndSortingRepository<FlightUser,String> {
}
