package com.website.ecommerce.service;

import com.website.ecommerce.configuration.EcommercePropertyConfiguration;
import com.website.ecommerce.configuration.JwtRequestFilter;
import com.website.ecommerce.dto.OrderInputDto;
import com.website.ecommerce.dto.OrderProductQuantityDto;
import com.website.ecommerce.model.OrderDetails;
import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.CartRepository;
import com.website.ecommerce.repository.OrderDetailsRepository;
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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailsService {

    private final EcommercePropertyConfiguration ecommercePropertyConfiguration;

    private final OrderDetailsRepository orderDetailsRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final JSONObject dataObject = new JSONObject();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject placeOrderDetails(boolean isNotCartCheckout, OrderInputDto orderInputDto) {
        try {
            List<OrderProductQuantityDto> orderProductQuantityDtoList = orderInputDto.getOrderProductQuantityDtoList();
            String currentUser = JwtRequestFilter.CURRENT_USER;
            Optional<User> optionalUser = userRepository.findByUserName(currentUser);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                OrderDetails orderDetails = createOrderDetails(orderInputDto, user);
                double totalPrice = 0;
                for (OrderProductQuantityDto orderProductQuantityDto : orderProductQuantityDtoList) {
                    Optional<Product> optionalProduct = productRepository.findById(orderProductQuantityDto.getProductId());
                    if (optionalProduct.isPresent()) {
                        Product product = optionalProduct.get();
                        orderDetails.getProducts().add(product);
                        totalPrice += product.getProductDiscountedPrice() * orderProductQuantityDto.getQuantity();
                    }
                }
                orderDetails.setOrderPrice(totalPrice);
                orderDetailsRepository.save(orderDetails);
                if (!isNotCartCheckout) {
                    log.info("Deleting cart for user: {}", user.getId());
                    cartRepository.deleteByUser(user);
                }
                dataObject.put("data", orderDetails);
            }
        } catch (Exception e) {
            log.error("Exception in placeOrderDetails: {}", e);
        }
        return dataObject;
    }

    private OrderDetails createOrderDetails(OrderInputDto orderInputDto, User user) {
        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrderName(orderInputDto.getFullName());
        orderDetails.setOrderAddress(orderInputDto.getFullAddress());
        orderDetails.setOrderPhone(orderInputDto.getPhone());
        orderDetails.setOrderAlternatePhone(orderInputDto.getAlternatePhone());
        orderDetails.setOrderEmail(orderInputDto.getEmail());
        orderDetails.setOrderStatus(ecommercePropertyConfiguration.getOrderPlaced());
        orderDetails.setProducts(new HashSet<>());
        orderDetails.setUser(user);
        return orderDetails;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getUserOrderDetails(int pageNumber, int pageSize) {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        Optional<User> userOptional = userRepository.findByUserName(currentUser);
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        int totalPages = 0;
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            orderDetailsList = orderDetailsRepository.findByUser(user, pageable).getContent();
            totalPages = orderDetailsRepository.findByUser(user, pageable).getTotalPages();
        }
        dataObject.put("data", orderDetailsList);
        dataObject.put("totalPages", totalPages);
        return dataObject;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getAllOrderDetails(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll(pageable).getContent();
        int totalPages = orderDetailsRepository.findAll(pageable).getTotalPages();
        dataObject.put("data", orderDetailsList);
        dataObject.put("totalPages", totalPages);
        return dataObject;
    }

    public void updateOrderStatus(List<Long> orderIds, String status) {
        log.info("Updating status for ids: {}", orderIds);
        switch (status.toLowerCase()) {
            case "delivered":
                orderDetailsRepository.updateOrderStatus(orderIds, ecommercePropertyConfiguration.getOrderDelivered());
                break;

            case "canceled":
                orderDetailsRepository.updateOrderStatus(orderIds, ecommercePropertyConfiguration.getOrderCanceled());
                break;
        
            default:
                break;
        }
    }
}
