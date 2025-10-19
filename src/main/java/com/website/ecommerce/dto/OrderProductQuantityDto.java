package com.website.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderProductQuantityDto {
    private Long productId;
    private Long quantity;
}
