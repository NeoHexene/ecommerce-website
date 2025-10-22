package com.website.ecommerce.controller;

import com.website.ecommerce.dto.OrderInputDto;
import com.website.ecommerce.service.OrderDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/order-details")
@RestController
@Slf4j
@RequiredArgsConstructor
public class OrderDetailsController {

    private final OrderDetailsService orderDetailsService;

    @PostMapping("/v1/place")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> placeOrderDetails(
            @RequestParam(name = "not-cart-checkout", defaultValue = "false") boolean isNotCartCheckout,
            @RequestBody OrderInputDto orderInputDto) {
        log.info("OrderDetailsController:placeOrderDetails: {}", orderInputDto);
        return new ResponseEntity<>(orderDetailsService.placeOrderDetails(isNotCartCheckout, orderInputDto),
                HttpStatus.OK);
    }

    @GetMapping("/v1/user/get-all")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> getUserOrderDetails(
            @RequestParam(name = "page-number", defaultValue = "0") int pageNumber,
            @RequestParam(name = "page-size", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(orderDetailsService.getUserOrderDetails(pageNumber, pageSize), HttpStatus.OK);
    }

    @GetMapping("/v1/admin/get-all")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<JSONObject> getAllOrderDetails(
        @RequestParam(name = "page-number", defaultValue = "0") int pageNumber,
        @RequestParam(name = "page-size", defaultValue = "10") int pageSize
    ) {
        return new ResponseEntity<>(orderDetailsService.getAllOrderDetails(pageNumber, pageSize), HttpStatus.OK);
    }

    @PostMapping("/v1/update-status")
    @PreAuthorize("hasRole('admin')")
    public void updateOrderStatus(@RequestParam(name = "order-ids") List<Long> orderIds) {
        
    }
}
