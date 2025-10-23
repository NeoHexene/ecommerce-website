package com.website.ecommerce.service;

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
import org.json.simple.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final JSONObject dataObject = new JSONObject();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewProduct(Product product) {
        log.info("Entering into createNewProduct: {}", product);
        productRepository.save(product);
        dataObject.put("data", product);
        return dataObject;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getAllProductDetails(int pageNumber, int pageSize, String searchKeyword) {
        log.info("Entering into getAllProductDetails");
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<Product> productList = new ArrayList<>();
        int totalPages = 0;
        if (!searchKeyword.isEmpty()) {
            productList = productRepository.findByProductNameContaining(searchKeyword, pageable).getContent();
            totalPages = productRepository.findByProductNameContaining(searchKeyword, pageable).getTotalPages();
        } else {
            productList = productRepository.findAll(pageable).getContent();
            totalPages = productRepository.findAll(pageable).getTotalPages();
        }
        dataObject.put("data", productList);
        dataObject.put("totalPages", totalPages);
        return dataObject;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getProductDetailsById(Long id) {
        log.info("Entering into getProductDetailsById: {}", id);
        Optional<Product> productOptional = productRepository.findById(id);
        productOptional.ifPresent(product -> dataObject.put("data", product));
        return dataObject;
    }

    public void deleteProductDetailsById(Long id) {
        log.info("Entering deleteProductDetails: {}", id);
        productRepository.deleteById(id);
    }

    @SuppressWarnings("unchecked")
    public JSONObject getProductCheckoutDetails(boolean singleProductCheckout, Long id) {
        log.info("Entering into getProductCheckoutDetails singleProductCheckout: {} id: {}", singleProductCheckout, id);
        List<Product> productList = new ArrayList<>();
        if  (singleProductCheckout && id != null) {
            Optional<Product> productOptional = productRepository.findById(id);
            productOptional.ifPresent(productList::add);
        } else {
            String currentUser = JwtRequestFilter.CURRENT_USER;
            Optional<User> userOptional = userRepository.findByUserName(currentUser);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<Cart> cartOptional = cartRepository.findByUser(user);
                if (cartOptional.isPresent()) {
                    Cart cart = cartOptional.get();
                    productList.addAll(cart.getProducts());
                }
            }
        }
        dataObject.put("data", productList);
        return dataObject;
    }
}
