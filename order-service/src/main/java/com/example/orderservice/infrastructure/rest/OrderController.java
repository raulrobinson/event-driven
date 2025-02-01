package com.example.orderservice.infrastructure.rest;

import com.example.commonpackages.dto.Order;
import com.example.commonpackages.dto.OrderEvent;
import com.example.orderservice.application.dto.OrderRequestDto;
import com.example.orderservice.application.usecase.SendMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("${controller.properties.base-path}/orders")
@Tag(name = "Order Service", description = "Operations pertaining to order service")
public class OrderController {
    private final SendMessage sendMessage;

    @Autowired
    public OrderController(SendMessage sendMessage) {
        this.sendMessage = sendMessage;
    }

    @PostMapping()
    @Operation(summary = "Place an order", description = "Place an order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order placed successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request")
    })
    public String placeOrder(@RequestBody OrderRequestDto orderRequest) {
        Order order = new Order();
        order.setOrderId(UUID.randomUUID().toString());
        order.setName(orderRequest.getName());
        order.setQty(orderRequest.getQty());
        order.setPrice(orderRequest.getPrice());

        OrderEvent orderEvent = new OrderEvent();
        orderEvent.setStatus("PENDING");
        orderEvent.setMessage("order status is in pending state");
        orderEvent.setOrder(order);

        sendMessage.sendMessage(orderEvent);

        return "Order placed successfully ...";
    }
}
