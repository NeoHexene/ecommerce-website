package com.website.ecommerce.controller;

import com.website.ecommerce.dto.OrderInputDto;
import com.website.ecommerce.service.OrderDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/order-details")
@RestController
@Slf4j
@RequiredArgsConstructor
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @PostMapping("/v1/place")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> placeOrderDetails(@RequestBody OrderInputDto orderInputDto) {
        log.info("OrderDetailsController:placeOrderDetails: {}", orderInputDto);
        return new ResponseEntity<>(orderDetailsService.placeOrderDetails(orderInputDto),HttpStatus.OK);
    }
}
