-- Charset y collation
SET
    NAMES utf8mb4;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS auth_db CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE auth_db;

-- Tabla de Géneros
CREATE TABLE
    Gender (
        gender_id INT PRIMARY KEY AUTO_INCREMENT,
        gender_name VARCHAR(20) UNIQUE
    );

-- Tabla de Usuarios
CREATE TABLE
    User (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        age INT,
        gender_id INT,
        profile_picture_url VARCHAR(255),
        description TEXT,
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_access DATETIME,
        rut VARCHAR(20) UNIQUE,
        cedula_number VARCHAR(20) UNIQUE,
        FOREIGN KEY (gender_id) REFERENCES Gender (gender_id)
    );

-- Tabla de Ubicaciones
CREATE TABLE
    User_Location (
        location_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNIQUE,
        latitude DECIMAL(10, 7),
        longitude DECIMAL(10, 7),
        FOREIGN KEY (user_id) REFERENCES User (user_id)
    );