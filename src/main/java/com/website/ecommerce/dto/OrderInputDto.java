package com.website.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderInputDto {
    private String fullName;
    private String fullAddress;
    private String phone;
    private String alternatePhone;
    private String email;
    private List<OrderProductQuantityDto> orderProductQuantityDtoList;
}
