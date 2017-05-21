DROP TABLE products;
CREATE TABLE products (
   id int(11) NOT NULL auto_increment,
   name varchar(255),
   price varchar(255),
   PRIMARY KEY  (id)
);

INSERT INTO products (name,price) VALUES
('camera','8,000'),
('wine','28,000'),
('watch','88,000'),
('car','8,888,000');