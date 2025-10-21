package com.website.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.ecommerce.model.Cart;
import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    public List<Cart> findByUser(User user);
    
    public void deleteByUser(User user);

    public void deleteByUserAndProduct(User user, Product product);
}
