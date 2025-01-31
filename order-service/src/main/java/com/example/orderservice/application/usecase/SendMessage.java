package com.example.orderservice.application.usecase;

import com.example.commonpackages.dto.OrderEvent;

public interface SendMessage {
    void sendMessage(OrderEvent event);
}
