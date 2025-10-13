package com.website.ecommerce.service;
import com.website.ecommerce.model.ProductImage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductImageService {

    public Set<ProductImage> uploadProductImages(MultipartFile[] images) {
        Set<ProductImage> productImageSet = new HashSet<>();
        log.info("Entering into uploadProductImages controller: {}", images);
        try {
            for (MultipartFile image : images) {
                ProductImage productImage = new ProductImage();
                productImage.setImageName(image.getOriginalFilename());
                productImage.setImageType(image.getContentType());
                productImage.setImageByte(image.getBytes());
                productImageSet.add(productImage);
            }
        } catch (Exception e) {
            log.error("Error occurred in uploadProductImages: {}", e);
        }
        return productImageSet;
    }
}
