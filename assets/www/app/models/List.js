/* CRUD FOR LISTS TABLE*/

// Declare variables 
var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 
var db = openDatabase(shortName, version, displayName,maxSize); 
var lists = [];

function errorHandler(transaction, error) { 
	console.log('Error: ' + error.message + ' code: ' + error.code); 
} 

function successHandler(transaction){
	console.log('Great success!');
}

/* CREATE */

function newList(name,budget) { 
	if (!window.openDatabase) { 
		alert('Databases are not supported in this browser.'); 
		return; 
	} 
	// inserts the values into the 'lists' table 
	db.transaction(function(transaction) { 
		transaction.executeSql(
			"INSERT INTO 'lists' (name,budget) VALUES (?, ?);",
			[name, budget],
			errorHandler
		);
	});
	return; 
} 

/* READ */

Ext.regModel('Lists', {
    fields: [

        {name: 'name',      type: 'string'},
        {name: 'budget',    type: 'int'}
    ]
});
var lists_store = new Ext.data.Store({
  model  : 'Lists',
  data: lists
});

// Get the data from the database and call the function listCallback when finished
// IMPORTANT!
// this function must be called before using the store
function getLists(){
  db.transaction(
      function (transaction) {
          transaction.executeSql('SELECT * FROM lists;', [],  listCallback);
      }
  );
}

function listCallback(transaction, results){
  if (results.rows.length != 0){
    // Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
      row = results.rows.item(i);
      lists_store.add({'name':row['name'],'budget':row['budget'],'id':row['id']});
    }    
  }
}

/* UPDATE */
function listUpdate(list_id, new_name, new_budget) {
	var setStm = [];
	var params = [];
	
	if (new_name) {
		setStm.push('name = ?');
		params.push(new_name);
	}
	if (typeof new_budget != 'undefined' && new_budget != null) {
		setStm.push('budget = ?');
		params.push(new_budget);
	}
	
	if (setStm.length == 0)  {
		return false;
	}
	
	params.push(list_id);
	db.transaction(function(transaction) {
		transaction.executeSql("UPDATE list SET " + setStm.join() + ' WHERE id = ?', params,successHandler,errorHandler);
	});
	return false;
}

function rename(list_id,new_name){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "UPDATE lists SET name=? WHERE id=?;",[new_name,list_id],successHandler,errorHandler); 
   });
   return false; 	   
}

function setBudget(list_id,new_budget){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "UPDATE lists SET budget=? WHERE id=?;",[new_budget,list_id],successHandler,errorHandler); 
   });
   return false; 	   
}

/* DELETE */

function deleteList(list_id){
db.transaction(function(transaction) { 
   transaction.executeSql(
   "DELETE FROM lists WHERE id=?;",[list_id],successHandler,errorHandler); 
   });
   return false; 	   
}

//testing
deleteList(4);
setBudget(3,666);
rename(1,'chuckvader');
newList('darthnorris',999);
getLists();