CREATE DATABASE SmartTiffin;
USE SmartTiffin;

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  address VARCHAR(200)
);

CREATE TABLE menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  food_name VARCHAR(100),
  price INT
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  food_id INT,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (food_id) REFERENCES menu(id)
);

INSERT INTO menu (food_name, price) VALUES
('Veg Tiffin',80),
('Paneer Meal',120),
('Special Thali',150);
