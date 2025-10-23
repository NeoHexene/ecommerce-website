package com.website.ecommerce.service;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.website.ecommerce.configuration.EcommercePropertyConfiguration;
import com.website.ecommerce.dto.TransactionDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final EcommercePropertyConfiguration ecommercePropertyConfiguration;

    private final JSONObject dataObject = new JSONObject();

    @SuppressWarnings("unchecked")
    public JSONObject initiateTransaction(Double amount) {
        try {
            log.info("Entering into initiateTransaction: {}", amount);
            org.json.JSONObject jsonObject = new org.json.JSONObject();
            jsonObject.put("amount", amount * 100); // Razorpay considers it as the smallest currency value (if usd then it is cents)
            jsonObject.put("currency", ecommercePropertyConfiguration.getRazorpayCurrency());

            RazorpayClient razorpayClient = new RazorpayClient(ecommercePropertyConfiguration.getRazorpayKeyId(),
                    ecommercePropertyConfiguration.getRazorpayKeySecret());

            Order order = razorpayClient.orders.create(jsonObject);
            log.info("Order details from Razorpay: {}", order);
            dataObject.put("data", prepareTransactionOutput(order));
        } catch (Exception e) {
            log.error("Error occurred in initiateTransaction: {}", e);
        }
        return dataObject;
    }

    private TransactionDto prepareTransactionOutput(Order order) {
        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setOrderId(order.get("id"));
        transactionDto.setKey(ecommercePropertyConfiguration.getRazorpayKeyId());
        transactionDto.setCurrency(order.get("currency"));
        transactionDto.setAmount(Double.parseDouble(order.get("amount").toString()));
        return transactionDto;
    }
}
