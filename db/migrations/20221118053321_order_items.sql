-- migrate:up
CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT,
  product_option_id INT NOT NULL,
  quantity INT NOT NULL,
  order_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_option_id) REFERENCES product_options(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- migrate:down

