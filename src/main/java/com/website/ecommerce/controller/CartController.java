package com.website.ecommerce.controller;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.website.ecommerce.service.CartService;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cart")
@Slf4j
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/v1/get-items/{productId}")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> addToCart(@PathParam("productId") Long productId) {
        return new ResponseEntity<>(cartService.addToCart(productId), HttpStatus.OK);
    }
    
}
