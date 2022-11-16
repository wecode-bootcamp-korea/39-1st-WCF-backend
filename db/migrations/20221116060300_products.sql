-- migrate:up
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sub_category_id INT NOT NULL,
  brand_id INT NOT NULL,
  serial_number VARCHAR(30) NOT NULL,
  title VARCHAR(50) NULL,
  discount_rate DECIMAL(3,1) NULL,
  size_detail INT NULL,
  thumbnail VARCHAR(100) NULL,
  product_detail TEXT NULL,
  price DECIMAL(10,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id)
);

-- migrate:down

