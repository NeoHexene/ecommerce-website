package com.website.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDto {
    private String orderId;
    private String key;
    private String currency;
    private Double amount;
}
