package de.neuefische.aeropath.controller;

import de.neuefische.aeropath.db.UserDb;
import de.neuefische.aeropath.model.FlightUser;
import de.neuefische.aeropath.model.LoginData;
import de.neuefische.aeropath.model.UserSource;
import de.neuefische.aeropath.security.JWTUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {


    @LocalServerPort
    public int port;

    @Autowired
    public TestRestTemplate restTemplate;

    @Autowired
    public PasswordEncoder encoder;

    @Autowired
    public UserDb userDb;

    @Autowired
    public JWTUtils jwtUtils;

    @BeforeEach
    public void resetDb() {
        userDb.deleteAll();
    }

    @Test
    public void loginWithValidCredentials() {
        //GIVEN
        FlightUser user = new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de","admin", "testuser",null, UserSource.CUSTOM);
        userDb.save(user);

        //WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> tokenResponse = restTemplate.postForEntity(url, new LoginData("newTestUser", "testPassword"), String.class);

        //THEN
        assertEquals(tokenResponse.getStatusCode(), HttpStatus.OK);
        assertTrue(jwtUtils.validateToken(tokenResponse.getBody(),"newTestUser"));
    }

    @Test
    public void loginWithInvalidCredentials() {
        //GIVEN
        FlightUser user = new FlightUser("newTestUser", encoder.encode("testPassword"), "user name", "user@test.de", "admin", "testuser", null, UserSource.CUSTOM);
        userDb.save(user);

        //WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> tokenResponse = restTemplate.postForEntity(url, new LoginData("newTestUser", "wrongTestPassword"), String.class);

        //THEN
        assertEquals(tokenResponse.getStatusCode(), HttpStatus.BAD_REQUEST);
    }

}
