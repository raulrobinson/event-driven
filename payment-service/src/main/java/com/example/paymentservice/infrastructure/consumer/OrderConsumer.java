package com.example.paymentservice.infrastructure.consumer;

import com.example.commonpackages.dto.Order;
import com.example.commonpackages.dto.OrderEvent;
import com.example.paymentservice.infrastructure.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumer {
    private static final Logger log = LoggerFactory.getLogger(OrderConsumer.class);
    private final OrderService orderService;

    @Autowired
    public OrderConsumer(OrderService orderService) {
        this.orderService = orderService;
    }

    @KafkaListener(
            topics = "${spring.kafka.topic.name}",
            groupId = "${spring.kafka.consumer.group-id}"
    )
    public void consume(OrderEvent event) {
        log.info("Order event received in payment service => {}", event);
        Order order = orderService.saveOrder(event.getOrder());
        log.info("Order saved in payment service => {}", order.getOrderId());

    }
}
