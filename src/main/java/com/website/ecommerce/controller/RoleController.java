package com.website.ecommerce.controller;

import com.website.ecommerce.model.Role;
import com.website.ecommerce.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/role")
@RestController
@Slf4j
@RequiredArgsConstructor
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/v1/create")
    public ResponseEntity<JSONObject> createNewRole(@RequestBody Role role) {
        log.info("Entering into createNewRole controller: {}",role);
        return new ResponseEntity<JSONObject>(roleService.createNewRole(role), HttpStatus.OK);
    }

    @GetMapping("/v1/get/{id}")
    public ResponseEntity<JSONObject> getRoleById(@PathVariable("id") Long id) {
        return null;
    }

}
