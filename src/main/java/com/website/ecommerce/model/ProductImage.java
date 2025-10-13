package com.website.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ecommerce_product_image")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;

    private String imageType;

    @Column(length = 999999999)
    private byte[] imageByte;
}
