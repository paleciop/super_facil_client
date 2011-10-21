
function newList(name,budget) { 
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
 return; 
} 