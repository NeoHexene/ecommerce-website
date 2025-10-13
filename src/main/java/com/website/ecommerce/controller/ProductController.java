package com.website.ecommerce.controller;

import com.website.ecommerce.model.Product;
import com.website.ecommerce.service.ProductImageService;
import com.website.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/product")
@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    private final ProductImageService productImageService;

    @PostMapping(value = "/v1/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<JSONObject> createNewProduct(@RequestPart("product") Product product, @RequestPart("imageFile") MultipartFile[] image) {

        product.setProductImages(productImageService.uploadProductImages(image));

        log.info("Entering into createNewProduct controller: {}", product);
        return new ResponseEntity<>(productService.createNewProduct(product), HttpStatus.OK);
    }


}
