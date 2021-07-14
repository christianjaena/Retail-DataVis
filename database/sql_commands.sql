CREATE DATABASE RetailDataVis;

CREATE TABLE items(
    stockCode CHAR(7) PRIMARY KEY,
    description VARCHAR(500),
    price DECIMAL
);

CREATE TABLE customers(
    customerID CHAR(5) PRIMARY KEY,
    country VARCHAR(150)
);

CREATE TABLE orders(
    invoiceNo CHAR(6) PRIMARY KEY,
    invoiceDate DATE,
    quantity INTEGER,
    stockCode CHAR(5) REFERENCES items,
    customerID CHAR(5) REFERENCES customers
);
