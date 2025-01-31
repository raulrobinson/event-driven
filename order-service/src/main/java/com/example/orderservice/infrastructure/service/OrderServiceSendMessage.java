package com.example.orderservice.infrastructure.service;

import com.example.commonpackages.dto.OrderEvent;

public interface OrderServiceSendMessage {
    void sendMessage(OrderEvent event);
}
