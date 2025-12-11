# E-Commerce Website

A full-stack e-commerce platform with secure payment processing, built using Angular, Spring Boot, and MySQL.

## Overview

Enterprise-level e-commerce application featuring user authentication, product management, shopping cart, Razorpay payment integration, and admin dashboard. Demonstrates modern web architecture with complete frontend-backend separation.

## Tech Stack

**Frontend:** Angular (TypeScript), RxJS, Angular Services  
**Backend:** Spring Boot, Maven, Spring Security  
**Database:** MySQL with Spring Data JPA, Hibernate, Lombok  
**Integration:** Razorpay Payment Gateway, CORS Filter for API communication

## Key Features

- User authentication with role-based access control
- Dynamic product catalog with search and filters
- Real-time shopping cart management
- Razorpay payment integration with secure verification
- Admin panel for product, order, and user management
- RESTful API architecture with proper error handling

## Architecture

```
Angular SPA (Port 4200) ──HTTP──▶ Spring Boot REST API (Port 8080) ──JPA──▶ MySQL Database
                                            │
                                            └──▶ Razorpay Payment Gateway
```

**Design Patterns:** MVC, Repository Pattern, Service Layer, DTO Pattern, Dependency Injection

## Technical Highlights

### 1. CORS Configuration
Implemented custom CORS filter in Spring Boot to handle cross-origin requests between frontend (4200) and backend (8080), allowing seamless API communication.

### 2. Secure Payment Flow
- Backend generates Razorpay order ID
- Frontend handles payment UI
- Backend verifies payment signature using HMAC SHA256
- Database updates only after successful verification

### 3. JPA Entity Relationships
Designed complex relationships (Users, Products, Orders, OrderItems) using JPA annotations with Lombok to reduce boilerplate code by ~40%.

### 4. Cart Persistence
Persistent cart storage linked to user accounts with optimistic locking to handle concurrent updates and prevent data inconsistency.

## Quick Start

### Prerequisites
Node.js, Java 11+, Maven 3.6+, MySQL 8.0+, Angular CLI

### Setup
```bash
# Database
CREATE DATABASE ecommerce_db;

# Backend
cd backend
mvn clean install
mvn spring-boot:run  # Runs on localhost:8080

# Frontend
cd frontend
npm install
ng serve  # Runs on localhost:4200
```

### Configuration
Update `application.properties` with MySQL and Razorpay credentials.

## Security

- Spring Security with BCrypt password encryption
- JWT token-based authentication
- CORS configuration for secure API access
- SQL injection prevention via JPA
- Payment signature verification

## Future Enhancements

- Product reviews and ratings
- Email notifications
- Advanced analytics dashboard
- Coupon system
- WebSocket for real-time inventory
