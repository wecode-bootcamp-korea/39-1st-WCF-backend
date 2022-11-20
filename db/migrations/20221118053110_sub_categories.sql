-- migrate:up
CREATE TABLE sub_categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  category_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- migrate:down

