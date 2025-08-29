package com.website.ecommerce.dto;

import com.website.ecommerce.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponseDto {
    private User user;
    private String jwtToken;
}
