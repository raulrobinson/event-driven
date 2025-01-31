package com.example.paymentservice.application.mapper;

import com.example.commonpackages.dto.Order;
import com.example.paymentservice.infrastructure.persistence.entity.OrderEntity;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public Order orderEntityToOrder(OrderEntity orderEntity) {
        Order order = new Order();
        order.setOrderId(orderEntity.getOrderId().toString());
        order.setName(orderEntity.getName());
        order.setQty(orderEntity.getQuantity().intValue());
        order.setPrice(orderEntity.getPrice());
        return order;
    }
}
