//package de.neuefische.aeropath.controller;
//import de.neuefische.aeropath.db.UserDb;
//import de.neuefische.aeropath.model.FlightUser;
//import de.neuefische.aeropath.model.UserSource;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import java.util.Optional;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class UserControllerTest {
//        @LocalServerPort
//    public int port;
//
//    @Autowired
//    public TestRestTemplate restTemplate;
//
//    @Autowired
//    public UserDb userDb;
//
//    @Autowired
//    public PasswordEncoder encoder;
//
//    @BeforeEach
//    public void resetDb(){
//        userDb.deleteAll();
//    }
//
//    @Test
//    public void addUserShouldAddUserToDb(){
//        //GIVEN
//        FlightUser registerUser = new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de","admin", "testuser",null, UserSource.CUSTOM);
//        userDb.save(registerUser);
//
//        //WHEN
//        String url = "http://localhost:"+ port + "/auth/register";
//        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de","admin", "testuser",null, UserSource.CUSTOM),String.class);
//
//        //THEN
//        Optional<FlightUser> user = userDb.findById("123");
//        assertTrue(user.isPresent());
//
//    }
//}

