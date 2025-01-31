package com.example.orderservice.infrastructure.service;

import com.example.commonpackages.dto.OrderEvent;
import com.example.orderservice.infrastructure.producer.OrderProducer;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceSendMessageImpl implements OrderServiceSendMessage {
    private static final Logger log = org.slf4j.LoggerFactory.getLogger(OrderServiceSendMessageImpl.class);
    private final OrderProducer orderProducer;

    @Autowired
    public OrderServiceSendMessageImpl(OrderProducer orderProducer) {
        this.orderProducer = orderProducer;
    }

    @Override
    public void sendMessage(OrderEvent event) {
        log.info("Order event => {}", event.toString());
        orderProducer.sendMessage(event);
    }
}
