CREATE DATABASE zeerostock;

USE zeerostock;

CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(100)
);

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  supplier_id INT,
  product_name VARCHAR(100),
  category VARCHAR(50),
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- SAMPLE DATA (15 RECORDS)
INSERT INTO suppliers (name, city) VALUES
('ABC Traders','Mumbai'),
('XYZ Supplies','Delhi'),
('Global Stock','Pune');

INSERT INTO inventory (supplier_id, product_name, category, quantity, price) VALUES
(1,'iPhone 13','Electronics',10,70000),
(1,'Samsung TV','Electronics',5,50000),
(2,'Office Chair','Furniture',20,3000),
(2,'Wood Table','Furniture',10,7000),
(3,'Shoes Nike','Fashion',30,2000),
(3,'T-Shirt','Fashion',50,500),
(1,'Laptop Dell','Electronics',8,60000),
(2,'Desk Lamp','Furniture',25,1200),
(3,'Watch','Fashion',15,2500),
(1,'iPad','Electronics',6,40000),
(2,'Sofa','Furniture',4,20000),
(3,'Jacket','Fashion',12,3500),
(1,'Headphones','Electronics',40,1500),
(2,'Cupboard','Furniture',3,15000),
(3,'Jeans','Fashion',22,1800);