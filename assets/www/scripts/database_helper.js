//OPEN DB
var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 
var db = openDatabase(shortName, version, displayName,maxSize); 

// this is called when an error happens in a transaction 
function errorHandler(transaction, error) { 
	alert('Error: ' + error.message + ' code: ' + error.code); 
} 

// this is called when a successful transaction happens 
function successCallBack() { 
	console.log("DEBUGGING: success");
	//alert("DEBUGGING: success"); 
} 

function nullHandler(){}; 

//OPEN DB



function newList(name,budget) {
alert("newList"); 
 if (!window.openDatabase) { 
   alert('Databases are not supported in this browser.'); 
   return; 
 } 
// inserts the values into the 'lists' table 
 db.transaction(function(transaction) { 
   transaction.executeSql(
   "INSERT INTO 'lists' (name,budget) VALUES (?, ?);",[name, budget],nullHandler,errorHandler); 
   });
   return false; 
} 

function newProduct(code,liked,categorized) { 
	if (!window.openDatabase) { 
    	alert('Databases are not supported in this browser.'); 
    	return; 
    } 
// inserts the values into the 'products' table 
 db.transaction(function(transaction) { 
   transaction.executeSql(
   "INSERT INTO 'products' (code,liked,categorized) VALUES (?, ?, ?);",[code, liked?1:0, categorized?1:0],nullHandler,errorHandler); 
   });
   return false; 
} 

function insertIntoListsProducts(quantity,scaned,products_id,lists_id) { 
	if (!window.openDatabase) { 
    	alert('Databases are not supported in this browser.'); 
    	return; 
    } 
// inserts the values into the 'products' table 
 db.transaction(function(transaction) { 
   transaction.executeSql(
   "INSERT INTO 'lists_products' VALUES (?, ?, ?, ?);",[quantity, scaned?1:0, products_id,lists_id],nullHandler,errorHandler); 
   });
   return false; 
} 


function getProductsFromList(list_id){

	var names = "";
	
	if (!window.openDatabase) { 
	  alert('Databases are not supported in this browser.'); 
	  return; 
	 } 
	
	 db.transaction(function(transaction) { 
	   transaction.executeSql('SELECT * FROM products p WHERE EXISTS(SELECT * FROM lists_products lp WHERE p.code = lp.products_id AND lp.lists_id = '+list_id+');', [], 
	     function(transaction, result) { 
	      if (result != null && result.rows != null) { 
	        for (var i = 0; i < result.rows.length; i++) { 
	          var row = result.rows.item(i);
	          names +="<br/>"+row.code;    
	        } 
	        $("#result").html(names);
	      } 
	     },errorHandler); 
	 },errorHandler,nullHandler); 
	
}

//select *
//from 


//insert into lists_products values (?,?,id_list,id_product)

function getListsNames(){

	var names = "";
	
	if (!window.openDatabase) { 
	  alert('Databases are not supported in this browser.'); 
	  return; 
	 } 
	
	 db.transaction(function(transaction) { 
	   transaction.executeSql('SELECT name,id FROM lists;', [], 
	     function(transaction, result) { 
	      if (result != null && result.rows != null) { 
	        for (var i = 0; i < result.rows.length; i++) { 
	          var row = result.rows.item(i);
	          names +="<a href='list.html?id="+row.id+"&name="+row.name+"'>" +row.name + "<a><br/>";    
	        } 
	        $("#result").html(names);
	      } 
	     },errorHandler); 
	 },errorHandler,nullHandler); 
	 
}

//gets a parameter from the URL
function gup( name ){

	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( decodeURI(window.location.href) );
	if( results == null )
		return "";
	else
		return results[1];
}

/*
SELECT s.* FROM person p, shirt s
 WHERE p.name LIKE 'palecio%'
   AND s.owner = p.id
   AND s.color <> 'white';
*/

function ListDBValues() { 
 if (!window.openDatabase) { 
  alert('Databases are not supported in this browser.'); 
  return; 
 } 

 db.transaction(function(transaction) { 
   transaction.executeSql('SELECT * FROM lists;', [], 
     function(transaction, result) { 
		$('#result').append('<b>lists</b><br/>');
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          $('#result').append('<br>' + row.id + '. ' + row.name+ ' ' + row.budget); 
        } 
      } 
     },errorHandler); 
 },errorHandler,nullHandler); 
 db.transaction(function(transaction) { 
   transaction.executeSql('SELECT * FROM products;', [], 
     function(transaction, result) { 
		$('#result').append('<br><b>products</b><br/>');
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          $('#result').append('<br>' + row.code + ' ' + row.liked+ ' ' + row.categorized); 
        } 
      } 
     },errorHandler); 
 },errorHandler,nullHandler); 
 db.transaction(function(transaction) { 
   transaction.executeSql('SELECT * FROM lists_products;', [], 
     function(transaction, result) { 
		$('#result').append('<br><b>lists_products</b><br/>');
      if (result != null && result.rows != null) { 
        for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          $('#result').append('<br>' + row.quantity + ' ' + row.scaned+ ' ' + row.products_id+ ' ' + row.lists_id); 
        } 
      } 
     },errorHandler); 
 },errorHandler,nullHandler); 
 return; 
} 