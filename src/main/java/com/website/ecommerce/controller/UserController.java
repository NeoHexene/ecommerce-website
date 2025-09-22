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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/user/v1/create")
    public ResponseEntity<JSONObject> createNewUser(@RequestBody User user) {
        log.info("Entering into createNewUser: {}",user);
        return new ResponseEntity<>(userService.createNewUser(user), HttpStatus.OK);
    }

    @GetMapping("/user/v1/get")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> getUserDemo() {
        JSONObject demo = new JSONObject();
        demo.put("data","User Logged in!");
        return new ResponseEntity<>(demo,HttpStatus.OK);
    }

    @PostMapping(value = "/admin/v1/create")
    @PreAuthorize("hasRole('admin')")
    //@PreAuthorize("hasAnyRole('admin','user')") will be used for checking multiple roles.
    public ResponseEntity<JSONObject> createNewAdmin(@RequestBody User user) {
        log.info("Entering into createNewAdmin: {}",user);
        return new ResponseEntity<>(userService.createNewAdmin(user), HttpStatus.OK);
    }

    @GetMapping("/admin/v1/get")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<JSONObject> getAdminDemo() {
        JSONObject demo = new JSONObject();
        demo.put("data","Admin Logged in!");
        return new ResponseEntity<>(demo,HttpStatus.OK);
    }

}
