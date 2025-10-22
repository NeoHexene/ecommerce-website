package com.website.ecommerce.repository;

import com.website.ecommerce.model.OrderDetails;
import com.website.ecommerce.model.User;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    public Page<OrderDetails> findByUser(User user, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update ecommerce_order_details o set o.order_status = :orderStatus where o.id in :orderIds ", nativeQuery = true)
    public void updateOrderStatus(@Param("orderIds") List<Long> orderIds, @Param("orderStatus") String orderStatus);
}
