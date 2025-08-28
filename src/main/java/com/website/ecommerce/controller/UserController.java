package com.website.ecommerce.controller;

import com.website.ecommerce.model.User;
import com.website.ecommerce.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(name = "/user")
@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void createDefaultUser() {
        log.info("Entering into createDefaultUser");
        userService.createDefaultUser();
    }

    @PostMapping(value = "/v1/create")
    public ResponseEntity<JSONObject> createNewUser(@RequestBody User user) {
        log.info("Entering into createNewUser: {}",user);
        return new ResponseEntity<>(userService.createNewUser(user), HttpStatus.OK);
    }

    @GetMapping("/v1/get/{id}")
    public ResponseEntity<JSONObject> getUserById(@PathVariable("id") Long id) {
        return null;
    }

}
