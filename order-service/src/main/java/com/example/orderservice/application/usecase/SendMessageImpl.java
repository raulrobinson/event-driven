package com.example.orderservice.application.usecase;

import com.example.commonpackages.dto.OrderEvent;
import com.example.orderservice.infrastructure.service.OrderServiceSendMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SendMessageImpl implements SendMessage {
    private final OrderServiceSendMessage orderServiceSendMessage;

    @Autowired
    public SendMessageImpl(OrderServiceSendMessage orderServiceSendMessage) {
        this.orderServiceSendMessage = orderServiceSendMessage;
    }

    @Override
    public void sendMessage(OrderEvent event) {
        orderServiceSendMessage.sendMessage(event);
    }
}
