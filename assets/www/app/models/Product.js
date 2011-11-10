/* CRUD FOR PRODUCTS TABLE*/

var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 
var db = openDatabase(shortName, version, displayName,maxSize); 
var products = [];

function errorHandler(transaction, error) { 
	console.log('Error: ' + error.message + ' code: ' + error.code); 
} 

function successHandler(transaction){
	console.log('Great success!');
}

/* CREATE */

function newProduct(code,liked,categorized) {
 
	if (!window.openDatabase) { 
    	alert('Databases are not supported in this browser.'); 
    	return; 
    } 
// inserts the values into the 'products' table 
  db.transaction(function(transaction) { 
    transaction.executeSql("INSERT INTO 'products' (code,liked,categorized) VALUES (?, ?, ?);",[code,liked, categorized?1:0],errorHandler); 
  });
  return false; 
} 

/* READ */

Ext.regModel('Products', {
    fields: [
        {name: 'code',      type: 'int'},
        {name: 'liked',    type: 'int'},
        {name: 'categorized',   type: 'int'}
    ]
});

var products_store = new Ext.data.Store({
  model  : 'Products',
  data: products
});
// Get the data from the database and call the function allDataSelectHandler when finished
function getProducts(){
  db.transaction(
      function (transaction) {
          transaction.executeSql('SELECT * FROM products;', [],  productsCallback);
      }
  );
}
function productsCallback(transaction, results){
 if (results.rows.length != 0){
    // Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
          row = results.rows.item(i);
          products_store.add({'code':row['code'],'liked':row['liked'],'categorized':row['categorized']});
     }
  }
}

/* UPDATE */

function like(product_code){
  db.transaction(function(transaction) { 
     transaction.executeSql("UPDATE products SET liked=1 WHERE code=?;",[product_code],successHandler,errorHandler);
  });
  return false; 	   
}

/*
function unlike(product_code){
  db.transaction(function(transaction) { 
     transaction.executeSql(
     "UPDATE products SET liked=0 WHERE code=?;",[product_code],successHandler,errorHandler); 
  });
  return false; 	  
}
*/

function categorize(product_code){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "UPDATE products SET categorized=1 WHERE code=?;",[product_code],successHandler,errorHandler); 
   });
   return false; 	   
}

function deCategorize(product_code){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "UPDATE products SET categorized=0 WHERE code=?;",[product_code],successHandler,errorHandler); 
   });
   return false; 	   
}

/* DELETE */

function deleteProduct(product_code){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "DELETE FROM products WHERE code=?;",[product_code],successHandler,errorHandler); 
   });
   return false; 	   
}

//testing
newProduct(12345,4,true);
like(12349,6);
categorize(12349);
deleteProduct(2457234);
getProducts();
