package de.neuefische.aeropath.controller;
import de.neuefische.aeropath.model.FlightUser;
import de.neuefische.aeropath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RequestMapping("auth/register")
@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void register (@RequestBody FlightUser user){
        userService.register(user);
    }
}
