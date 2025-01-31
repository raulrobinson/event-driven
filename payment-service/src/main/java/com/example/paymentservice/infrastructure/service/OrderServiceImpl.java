package com.example.paymentservice.infrastructure.service;

import com.example.commonpackages.dto.Order;
import com.example.paymentservice.application.mapper.OrderMapper;
import com.example.paymentservice.infrastructure.persistence.entity.OrderEntity;
import com.example.paymentservice.infrastructure.persistence.repository.OrderRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {
    private static final Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    public Order saveOrder(Order order) {
        log.info("Order saved: {}", order);
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setOrderId(UUID.fromString(order.getOrderId()));
        orderEntity.setName(order.getName());
        orderEntity.setQuantity((long) order.getQty());
        orderEntity.setPrice(order.getPrice());
        OrderEntity orderSaved = orderRepository.save(orderEntity);
        return orderMapper.orderEntityToOrder(orderSaved);
    }
}
