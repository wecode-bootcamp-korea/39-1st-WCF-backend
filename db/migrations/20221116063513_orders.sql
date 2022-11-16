-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(30),
  address VARCHAR(30),
  order_status VARCHAR(20),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down

