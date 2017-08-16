# Drop this code into mysql to:

# delete any existing databases called bamazon, then create one called bamazon.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
#tell mysql to use the bamazon schema.
USE bamazon;
#create a table called products and populate with columns
CREATE TABLE Products (
  item_id INTEGER(5) NOT NULL,
  product_name varchar(30) NOT NULL,
  department_name varchar(30) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER(30) NOT NULL
);
#populate the columns wih 
INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES 
	(1111, 'The Flame Bearer', 'books', 19.00, 10),
	(1112, 'Terminator', 'dvds', 15.00, 25),
	(1113, 'Eloquent Javascript', 'books', 25.00, 5),
	(1114, 'Chai Tea', 'grocery', 18.00, 30),
	(1115, 'Wardruna', 'music', 15.00, 2),
	(1116, 'Vikings', 'dvds', 25.00, 10),
	(1117, 'Blind Guardian', 'music', 15.00, 3),
	(1118, 'Game of Thrones', 'dvds', 20.00, 4),
	(1119, 'Lord of the Rings', 'books', 12.00, 6),
	(1110, 'Butterfinger', 'grocery', 1.00, 30);

	SELECT * FROM products;