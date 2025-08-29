package com.website.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtRequestDto {
    private String userName;
    private String userPassword;
}
