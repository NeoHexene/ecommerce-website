package com.website.ecommerce.model;

import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ecommerce_cart")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ecommerce_cart_product_mapping",
        joinColumns = {@JoinColumn(name = "cart_id")},
        inverseJoinColumns = {@JoinColumn(name = "product_id")}
    )
    private Set<Product> products;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
