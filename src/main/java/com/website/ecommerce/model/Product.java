package com.website.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "ecommerce_product")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private String productDescription;

    private Double productDiscountedPrice;

    private Double productActualPrice;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "ecommerce_product_image_mapping",
    joinColumns = { @JoinColumn(name = "product_id") },
    inverseJoinColumns = { @JoinColumn(name = "image_id") } )
    private Set<ProductImage> productImages;
}
