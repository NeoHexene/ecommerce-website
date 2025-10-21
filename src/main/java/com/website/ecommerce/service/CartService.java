package com.website.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.website.ecommerce.configuration.JwtRequestFilter;
import com.website.ecommerce.model.Cart;
import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.CartRepository;
import com.website.ecommerce.repository.ProductRepository;
import com.website.ecommerce.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartService {
    
    private final JSONObject dataObject = new JSONObject();

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    @SuppressWarnings("unchecked")
    public JSONObject addToCart(Long productId) {
        log.info("Entering into addToCart: {}", productId);
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        Optional<Product> productOptional = productRepository.findById(productId);
        
        if (productOptional.isPresent() && userOptional.isPresent()) {
            Product product = productOptional.get();
            User user = userOptional.get();
            Cart cart = createCartObject(user, product);
            cartRepository.save(cart);
            dataObject.put("data", cart);
        }
        return dataObject;
    }

    private Cart createCartObject(User user, Product product) {
        Cart cart = new Cart();
        cart.setProduct(product);
        cart.setUser(user);
        return cart;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getCartDetails() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Cart> cartList = cartRepository.findByUser(user);
            dataObject.put("data", cartList);
        }
        return dataObject;
    }
}
