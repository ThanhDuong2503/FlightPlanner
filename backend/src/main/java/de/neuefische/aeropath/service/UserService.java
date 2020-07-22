package de.neuefische.aeropath.service;
import de.neuefische.aeropath.db.UserDb;
import de.neuefische.aeropath.model.FlightUser;
import de.neuefische.aeropath.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserDb userDb;
    private final IdUtils idUtils;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserDb userDb, IdUtils idUtils) {
        this.userDb = userDb;
        this.idUtils = idUtils;
    }


    public void register(FlightUser user) {
        String codedPw = encoder.encode(user.getPassword());
        user.setPassword(codedPw);
        user.setId(idUtils.generateRandomId());
        user.setRole("user");
        userDb.save(user);
    }
}
