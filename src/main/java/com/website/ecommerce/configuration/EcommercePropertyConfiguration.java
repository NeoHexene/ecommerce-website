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

    @Value("$(website.ecommerce.createDefaultUser)")
    private String createDefaultUser;

    @Value("$(website.ecommerce.system)")
    private String system;
}
