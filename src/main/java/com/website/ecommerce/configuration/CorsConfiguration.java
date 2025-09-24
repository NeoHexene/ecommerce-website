package com.website.ecommerce.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Autowired
    private EcommercePropertyConfiguration ecommercePropertyConfiguration;

    private static final String GET = "GET";
    private static final String POST = "POST";
    private static final String PUT = "PUT";
    private static final String DELETE = "DELETE";

    @Bean
    public WebMvcConfigurer corsConfigurer (){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods(GET, POST, PUT, DELETE)
                        .allowedHeaders("*").allowedOrigins(ecommercePropertyConfiguration.getAllowedOrigins()).allowCredentials(true);
            }
        };
    }
}
