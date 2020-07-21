//package de.neuefische.aeropath.controller;
//import de.neuefische.aeropath.db.UserDb;
//import de.neuefische.aeropath.model.FlightUser;
//import de.neuefische.aeropath.model.UserSource;
//import de.neuefische.aeropath.utils.IdUtils;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import java.util.Optional;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class UserControllerTest {
//    @LocalServerPort
//    public int port;
//
//    @Autowired
//    public TestRestTemplate restTemplate;
//
//    @MockBean
//    private IdUtils idUtils;
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
//        when(idUtils.generateRandomId()).thenReturn("abc123");
//        FlightUser registerUser = new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de","admin", "testuser",null, UserSource.CUSTOM, "abc123");
//        userDb.save(registerUser);
//
//        //WHEN
//        String url = "http://localhost:"+ port + "/auth/register";
//        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de","admin", "testuser",null, UserSource.CUSTOM, "abc123"),String.class);
//        HttpStatus responseStatus = postResponse.getStatusCode();
//
//        //THEN
//        assertEquals(responseStatus, HttpStatus.OK);
//        Optional<FlightUser> user = userDb.findById("abc123");
//        assertTrue(user.isPresent());
//        assertEquals(postResponse.getBody(), userDb.findById("abc123").get());
//    }
//}
//
