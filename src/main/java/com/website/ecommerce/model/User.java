package com.website.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ecommerce_user")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userName;

    private String userFirstName;

    private String userLastName;

    private String userPassword;

    private String action;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdOn;

    private String createdBy;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    private String updatedBy;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "ecommerce_user_role_mapping",
            joinColumns = {
                    @JoinColumn(name = "user_id")
            }, inverseJoinColumns = {
            @JoinColumn(name = "role_id")
    })
    private Set<Role> roles = new HashSet<>();
}
