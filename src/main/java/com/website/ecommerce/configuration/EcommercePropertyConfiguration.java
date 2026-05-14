package com.website.ecommerce.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "website.ecommerce")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EcommercePropertyConfiguration {

    private String createDefaultUser;
    private String system;
    private String jwtExpiration;
    private String jwtSecret;
    private String[] allowedOrigins;
    private String[] allowedEndPoints;
    private String orderPlaced;
    private String orderDelivered;
    private String orderCanceled;
    private String razorpayKeyId;
    private String razorpayKeySecret;
    private String razorpayCurrency;
}
