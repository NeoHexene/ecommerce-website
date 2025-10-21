package com.website.ecommerce.repository;

import com.website.ecommerce.model.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = "select p.* from ecommerce_product p where lower(p.product_name) like lower(concat('%',:searchKeyword,'%'))", nativeQuery = true)
    Page<Product> findByProductNameContaining(@Param("searchKeyword") String searchKeyword, Pageable pageable);

}
