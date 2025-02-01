package com.example.orderservice.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderRequestDto {
    @Schema(description = "Product name", example = "Laptop")
    private String name;

    @Schema(description = "Product quantity", example = "2")
    private int qty;

    @Schema(description = "Product price", example = "999.99")
    private double price;
}
