package com.example.paymentservice.infrastructure.service;

import com.example.commonpackages.dto.Order;

public interface OrderService {
    Order saveOrder(Order order);
}
