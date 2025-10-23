package com.website.ecommerce.controller;

import com.website.ecommerce.dto.JwtRequestDto;
import com.website.ecommerce.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/jwt")
@RestController
@Slf4j
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/v1/create")
    public ResponseEntity<JSONObject> createJwtToken(@RequestBody JwtRequestDto jwtRequestDto)
            throws Exception {
        log.info("Entering into createJwtToken: {}",jwtRequestDto);
        return new ResponseEntity<>(jwtService.createJwtToken(jwtRequestDto,
                authenticationManager),HttpStatus.OK);
    }
}
