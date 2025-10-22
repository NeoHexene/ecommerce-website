package com.website.ecommerce.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "website.ecommerce")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EnableConfigurationProperties(EcommercePropertyConfiguration.class)
public class EcommercePropertyConfiguration {

    @Value("$(website.ecommerce.create-default-user)")
    private String createDefaultUser;

    @Value("$(website.ecommerce.system)")
    private String system;

    @Value("$(website.ecommerce.jwt-expiration)")
    private String jwtExpiration;

    @Value("$(website.ecommerce.jwt-secret)")
    private String jwtSecret;

    @Value("$(website.ecommerce.allowed-origins)" )
    private String[] allowedOrigins;

    @Value("$(website.ecommerce.allowed-end-points)")
    private String[] allowedEndPoints;

    @Value("$(website.ecommerce.order-placed)")
    private String orderPlaced;

    @Value("$(website.ecommerce.order-delivered)")
    private String orderDelivered;

    @Value("$(website.ecommerce.order-canceled)")
    private String orderCanceled;

}
