package com.website.ecommerce.model;

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

    @OneToOne(cascade = CascadeType.ALL)
    private Product product;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}
