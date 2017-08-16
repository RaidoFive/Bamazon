//init dependency variables
var mysql = require('mysql');
//var prompt = require('prompt');
var inquirer = require('inquirer');
//init connection to mysql
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',//******Use your mysql password here!
	database: "bamazon"
});

connection.connect();

//prompting user for input to make a purchase with bamazon.
function promptUser() {
	inquirer.prompt([
  {
    type: 'input',
    name: 'item_id',
    message: 'Please enter the item number you would like to purchase: '
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many would you like to buy?'
  }
	]).then(function(input) {
    var item = input.item_id;
    var quantity = input.quantity;
    var query = 'SELECT * FROM products WHERE ?';

    //connect to mysql, reference database to display product information to user, and complete a purchase order.
    connection.query(query, {item_id: item}, function(err, res) {
      if (err) throw err;

      if (res.length === 0) {
        console.log('Please select a valid Item ID.');
        displayInventory();
      } else {
        var productData = res[0];
        if (quantity <= productData.stock_quantity) {
          console.log('Thank you!  Your order is being processed!');
          console.log(".");
          console.log(".");
          console.log(".");
          console.log(".");

          var update = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

          connection.query(update, function(err, res) {
            if (err) {
              console.log(err);
            }
              console.log("Your order is complete!  Your total is $" + productData.price * quantity);
              console.log("Thank you for shopping with Bamazon.  Please come again!");

              connection.end();

          });

        } else {
            console.log("Sorry, there isn't enough inventory to complete your order.");

            displayInventory();
        }    
      } 
    });
  });
}
//show the inventory table for the User to see.
function displayInventory() {
  connection.query('SELECT * FROM products', function(err, data) {
    if (err) {
      console.log(err);
    } 
      console.log('Current Inventory');
      console.log('--------------');

      var getInv = '';
      for (var i = 0; i < data.length; i ++) {
        getInv = '';
        getInv += 'Item ID: ' + data[i].item_id + ' | ';
        getInv += 'Product Name: ' + data[i].product_name + ' | ';
        getInv += 'Department: ' + data[i].department_name + ' | ';
        getInv += 'Price: $' + data[i].price; 

        console.log(getInv);
      }
        console.log('-----------------');
        promptUser();
  })
}

function runBamazon() {
  displayInventory();
}

runBamazon();





