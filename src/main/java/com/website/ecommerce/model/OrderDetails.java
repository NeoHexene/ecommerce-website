package com.website.ecommerce.model;

import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ecommerce_order_details")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderName;

    @Column(length = 4000)
    private String orderAddress;

    private String orderPhone;

    private String orderAlternatePhone;

    private String orderEmail;

    private String orderStatus;

    private Double orderPrice;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ecommerce_order_details_product_mapping",
        joinColumns = {@JoinColumn(name = "order_details_id")},
        inverseJoinColumns = {@JoinColumn(name = "product_id")}
    )
    private Set<Product> products;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
