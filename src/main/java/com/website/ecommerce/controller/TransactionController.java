package com.website.ecommerce.controller;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.website.ecommerce.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/v1/initiate")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity<JSONObject> initiateTransaction(
            @RequestParam(name = "amount", defaultValue = "0.0") Double amount) {
        return new ResponseEntity<>(transactionService.initiateTransaction(amount), HttpStatus.OK);
    }
}
