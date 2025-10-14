package com.website.ecommerce.service;

import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.Role;
import com.website.ecommerce.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    private final JSONObject dataObject = new JSONObject();
//    private final HashMap<String, Object> dataMap = new HashMap<>();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewProduct(Product product) {
        log.info("Entering into createNewProduct: {}", product);
        productRepository.save(product);
        dataObject.put("data", product);
        return dataObject;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getAllProducts() {
        List<Product> productList = productRepository.findAll();
        dataObject.put("data", productList);
        return dataObject;
    }

    public void deleteProductDetailsById(Long id) {
        log.info("Entering deleteProductDetails: {}", id);
        productRepository.deleteById(id);
    }
}
