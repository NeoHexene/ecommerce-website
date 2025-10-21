package com.website.ecommerce.controller;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.website.ecommerce.service.CartService;
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
    public ResponseEntity<JSONObject> addToCart(@PathVariable("productId") Long productId) {
        return new ResponseEntity<>(cartService.addToCart(productId), HttpStatus.OK);
    }

    @GetMapping("/v1/get")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> getCartDetails() {
        return new ResponseEntity<>(cartService.getCartDetails(), HttpStatus.OK);
    }

    @DeleteMapping("/v1/remove-item/{productId}")
    @PreAuthorize("hasRole('user')")
    public void removeProductFromCart(@PathVariable("productId") Long productId) {
        cartService.removeProductFromCart(productId);
    }
    
}
