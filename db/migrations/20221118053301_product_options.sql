-- migrate:up
CREATE TABLE product_options (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);

-- migrate:down

