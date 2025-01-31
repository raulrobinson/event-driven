# event-driven

This repository showcases an event-driven architecture implemented with Spring Boot and Apache Kafka.

![event-driven.png](event-driven.png)

## Repository Description

In this architecture, the OrderService, PaymentService, and EmailService microservices operate independently and communicate via event-driven messaging.

- **OrderService:** A producer application that generates events and sends them to a Kafka message broker.
- **PaymentService:** A consumer microservice responsible for processing events related to payment processing.
- **EmailService:** Another consumer microservice that handles email notifications based on events.

This repository contains code, configuration, and resources for building and deploying this event-driven system. It serves as a practical example for those interested in implementing event-driven architectures with Spring Boot and Kafka.

