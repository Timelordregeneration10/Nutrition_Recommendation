CREATE DATABASE IF NOT EXISTS nutrition;
USE nutrition;

CREATE TABLE IF NOT EXISTS user(
    id INT AUTO_INCREMENT UNIQUE,
    username VARCHAR(20),
    password VARCHAR(20),
    signature VARCHAR(40),
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS data_recommendation(
    username VARCHAR(20),
    conditions VARCHAR(40),
    symptoms VARCHAR(40),
    treatments VARCHAR(40),
    recommendation VARCHAR(120),
    date DATE,
    FOREIGN KEY (username) REFERENCES user(username)
);

CREATE TABLE IF NOT EXISTS date_recommendation(
    username VARCHAR(20),
    foods VARCHAR(90),
    dates VARCHAR(90),
    recommendation VARCHAR(120),
    date DATE,
    FOREIGN KEY (username) REFERENCES user(username)
);

CREATE TABLE IF NOT EXISTS region_recommendation(
    username VARCHAR(20),
    region VARCHAR(30),
    recommendation VARCHAR(120),
    date DATE,
    FOREIGN KEY (username) REFERENCES user(username)
);

SHOW TABLES;
