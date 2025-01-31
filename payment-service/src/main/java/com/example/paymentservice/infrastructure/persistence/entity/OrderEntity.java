package com.example.paymentservice.infrastructure.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class OrderEntity {
    @Id
    @UuidGenerator
    @Column(name = "order_id", nullable = false, updatable = false)
    private UUID orderId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "qty", nullable = false)
    private Long quantity;

    @Column(name = "price", nullable = false)
    private Double price;
}
