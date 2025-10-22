package com.website.ecommerce.service;

import java.lang.foreign.Linker.Option;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.website.ecommerce.configuration.JwtRequestFilter;
import com.website.ecommerce.model.Cart;
import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.CartRepository;
import com.website.ecommerce.repository.ProductRepository;
import com.website.ecommerce.repository.UserRepository;

import jakarta.transaction.Transactional;
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

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject addToCart(Long productId) {
        log.info("Entering into addToCart: {}", productId);
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        Optional<Product> productOptional = productRepository.findById(productId);
        Cart cart = new Cart();
        if (productOptional.isPresent() && userOptional.isPresent()) {
            Product product = productOptional.get();
            User user = userOptional.get();
            Optional<Cart> cartOptional = cartRepository.findByUser(user);
            if (cartOptional.isPresent()) {
                cart = cartOptional.get();
                cart.getProducts().add(product);
            } else {
                cart = createCartObject(user, product);
            }
            cartRepository.save(cart);
            dataObject.put("data", cart);
        }
        return dataObject;
    }

    private Cart createCartObject(User user, Product product) {
        Cart cart = new Cart();
        Set<Product> productSet = new HashSet<>();
        productSet.add(product);
        cart.setProducts(productSet);
        cart.setUser(user);
        return cart;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getCartDetails() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        Cart cart = new Cart();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Cart> cartOptional = cartRepository.findByUser(user);
            if(cartOptional.isPresent()) {
                cart = cartOptional.get();
            }
        }
        dataObject.put("data", cart);
        return dataObject;
    }

    @Transactional
    public void removeProductFromCart(Long id) {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        Optional<Product> productOptional = productRepository.findById(id);
        if (userOptional.isPresent() && productOptional.isPresent()) {
            User user = userOptional.get();
            Product productToRemove = productOptional.get();
            Optional<Cart> cartOptional = cartRepository.findByUser(user);
            if (cartOptional.isPresent()) {
                Cart cart = cartOptional.get();
                cart.getProducts().remove(productToRemove);
                cartRepository.save(cart);
            }
        }
    }
}
