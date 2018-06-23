CREATE DATABASE journal_db;
USE journal_db;

CREATE TABLE users (
    userId INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created DATETIME NOT NULL,
    modified DATETIME NOT NULL
)

CREATE TABLE books (
    bookId INTEGER AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(100) NOT NULL,
    book_body TEXT NOT NULL,
    userId NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    created DATETIME NOT NULL,
    modified DATETIME NOT NULL
)