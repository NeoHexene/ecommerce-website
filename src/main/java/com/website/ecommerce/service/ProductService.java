package com.website.ecommerce.service;

import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.Role;
import com.website.ecommerce.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

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
    public JSONObject getAllProductDetails() {
        log.info("Entering into getAllProductDetails");
        List<Product> productList = productRepository.findAll();
        dataObject.put("data", productList);
        return dataObject;
    }

    public JSONObject getProductDetailsById(Long id) {
        log.info("Entering into getProductDetailsById: {}", id);
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            dataObject.put("data", product);
        }
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
        if  (singleProductCheckout) {
            Optional<Product> productOptional = productRepository.findById(id);
            productOptional.ifPresent(productList::add);
        } else {

        }
        dataObject.put("data", productList);
        return dataObject;
    }
}
