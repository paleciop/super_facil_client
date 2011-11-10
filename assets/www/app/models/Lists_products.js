/* LISTS_PRODUCTS CRUD*/

var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 
var db = openDatabase(shortName, version, displayName,maxSize); 
var lists_products = [];
var lists_products_relationship = [];

function errorHandler(transaction, error) { 
	console.log('Lists_products.js: Error: ' + error.message + ' code: ' + error.code); 
} 

function successHandler(transaction){
	console.log('Lists_products.js: Great success!');
}
// Set up datamodel

/* CREATE */

function newRelationship(quantity,scaned_products,products_id,lists_id) { 
	if (!window.openDatabase) { 
    	alert('Databases are not supported in this browser.'); 
    	return; 
    } 
// inserts the values into the 'products' table 
 db.transaction(function(transaction) { 
   transaction.executeSql(
   "INSERT INTO 'lists_products' VALUES (?, ?, ?, ?);",[quantity, scaned_products, products_id,lists_id],successHandler,errorHandler); 
   });
   return false; 
}

/* READ */ 

Ext.regModel('Lists_products', {
    fields: [
        {name: 'code',      type: 'int'},
        {name: 'liked',    type: 'int'},
        {name: 'categorized',   type: 'int'}
    ]
});
var lists_products_store = new Ext.data.Store({
  model  : 'Lists_products',
  data: lists_products
});
// Get the data from the database and call the function allDataSelectHandler when finished
function getProductsFromList(list_id){
  db.transaction(
      function (transaction) {
          // OJO! 
          // 'quantity' es el numero de cierto producto en la lista y 'scaned' es el numero de productos que lleva escaneados
          // Ejemplo: al crear su lista, selecciono 100 litros de cerveza. En ese caso 'quantity' = 100, cuando esté en el super escaneando
          // sus listas, para el producto 'cerveza' de la lista 'mi lista' va a empezar en 0 y conforme el chatio escanee las cervezas (o la escanee una vez
          // y ponga el numero) se va a ir aumentando 'scaned'
          // no hay que confundirlos.
          transaction.executeSql('SELECT * FROM products p WHERE EXISTS(SELECT * FROM lists_products lp WHERE p.code = lp.products_id AND lp.lists_id = ?);', [list_id],  listsProductsCallback);
      }
  );
}


function listsProductsCallback(transaction, results){
console.log("entered");
 if (results.rows.length != 0){
    // Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
          row = results.rows.item(i);
          lists_products_store.add({'code':row['code'],'liked':row['liked'],'categorized':row['categorized']});
    }  
  }
}
//****************************************************************************

Ext.regModel('Lists_products_relationship', {
    fields: [
        {name: 'code',      type: 'int'},
        {name: 'list_id',    type: 'int'},
        {name: 'scaned',   type: 'int'},
        {name: 'quantity',   type: 'int'}
    ]
});
var lists_products_relationship_store = new Ext.data.Store({
  model  : 'Lists_products_relationship',
  data: lists_products_relationship
});
// Get the data from the database and call the function allDataSelectHandler when finished
function getRelationship(list_id){
  db.transaction(
      function (transaction) {
          transaction.executeSql('SELECT * FROM lists_products WHERE lists_id=?;', [list_id],  listsProductsCallback);
      }
  );
}


function listsProductsCallback(transaction, results){
console.log("entered");
 if (results.rows.length != 0){
 console.log("ennnntered!");
    // Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
          row = results.rows.item(i);
          console.log(row['products_id']);
          console.log(row['scaned']);
          lists_products_relationship_store.add({'code':row['products_id'],'list_id':row['lists_id'],'scaned':row['scaned'],'quantity':row['quantity']});
    }  
  }
}
/* UPDATE */

function setQuantity(quantity,product_code,list_id){
  db.transaction(function(transaction) { 
     transaction.executeSql("UPDATE lists_products SET quantity=? WHERE products_id=? AND lists_id=?;",[quantity,product_code,list_id],successHandler,errorHandler);
  });
  return false; 	   
}

function setScaned(scaned,product_code,list_id){
  db.transaction(function(transaction) { 
     transaction.executeSql("UPDATE lists_products SET scaned=? WHERE products_id=? AND lists_id=?;",[scaned,product_code,list_id],successHandler,errorHandler);
  });
  return false; 	   
}

/* DELETE */

function deleteProduct(product_code,list_id){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "DELETE FROM lists_products WHERE products_id=? AND lists_id=?;",[product_code,list_id],successHandler,errorHandler); 
   });
   return false; 	   
}

//testing

newRelationship(33,2,12345,1);
newRelationship(22,3,12349,1);
getRelationship(1);
