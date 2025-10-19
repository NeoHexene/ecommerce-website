package com.website.ecommerce.service;

import com.website.ecommerce.configuration.JwtRequestFilter;
import com.website.ecommerce.dto.OrderInputDto;
import com.website.ecommerce.dto.OrderProductQuantityDto;
import com.website.ecommerce.model.OrderDetails;
import com.website.ecommerce.model.Product;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.OrderDetailsRepository;
import com.website.ecommerce.repository.ProductRepository;
import com.website.ecommerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailsService {

    private static final String ORDER_PLACED = "Placed";

    private final OrderDetailsRepository orderDetailsRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final JSONObject dataObject = new JSONObject();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject placeOrderDetails(OrderInputDto orderInputDto) {
        try {
            List<OrderDetails> orderDetailsList = new ArrayList<>();
            List<OrderProductQuantityDto> orderProductQuantityDtoList = orderInputDto.getOrderProductQuantityDtoList();
            for (OrderProductQuantityDto orderProductQuantityDto : orderProductQuantityDtoList) {
                Optional<Product> optionalProduct = productRepository.findById(orderProductQuantityDto.getProductId());
                String currentUser = JwtRequestFilter.CURRENT_USER;
                Optional<User> optionalUser = userRepository.findByUserName(currentUser);
                if (optionalProduct.isPresent() && optionalUser.isPresent()) {
                    Product product = optionalProduct.get();
                    User user = optionalUser.get();
                    orderDetailsList.add(createOrderDetails(orderInputDto, orderProductQuantityDto, product, user));
                }
            }
            orderDetailsRepository.saveAll(orderDetailsList);
            dataObject.put("data", orderDetailsList);
        } catch (Exception e) {
            log.error("Exception in placeOrderDetails: {}", e);
        }
        return dataObject;
    }

    private OrderDetails createOrderDetails(OrderInputDto orderInputDto, OrderProductQuantityDto orderProductQuantityDto, Product product, User user) {
        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrderName(orderInputDto.getFullName());
        orderDetails.setOrderAddress(orderInputDto.getFullAddress());
        orderDetails.setOrderPhone(orderInputDto.getPhone());
        orderDetails.setOrderAlternatePhone(orderInputDto.getAlternatePhone());
        orderDetails.setOrderEmail(orderInputDto.getEmail());
        orderDetails.setOrderStatus(ORDER_PLACED);
        orderDetails.setProduct(product);
        orderDetails.setUser(user);
        orderDetails.setOrderPrice(product.getProductDiscountedPrice() * orderProductQuantityDto.getQuantity());
        return orderDetails;
    }
}
