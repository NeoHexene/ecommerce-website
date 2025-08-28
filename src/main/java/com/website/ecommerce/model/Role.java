package com.website.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ecommerce_role")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String roleId;

    @Column(unique = true)
    private String roleName;

    private String roleDescription;

    private String action;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdOn;

    private String createdBy;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    private String updatedBy;
}
