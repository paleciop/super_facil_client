// global variables 
var db; 
var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 

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
// called when the application loads 
function onBodyLoad(){ 
	if (!window.openDatabase) { 
		// not all mobile devices support databases  if it does not, the following alert will display 
		// indicating the device will not be albe to run this application 
		alert('Databases are not supported in this browser.'); 
		return;
	} 
	// this line tries to open the database base locally on the device 
	// if it does not exist, it will create it and return a database object stored in variable db 
	db = openDatabase(shortName, version, displayName,maxSize); 
	
	//create the tables
	//one transaction per table
	db.transaction(function(tx){ 
	
		tx.executeSql( 
		//sql init
		"CREATE TABLE IF NOT EXISTS 'lists' ('id'  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL COLLATE BINARY  DEFAULT 0,'name'  TEXT NOT NULL,'budget'  INTEGER NOT NULL,UNIQUE ('id' ASC) ON CONFLICT ABORT);"
		//sql end
		,nullHandler,nullHandler);  },errorHandler,successCallBack);
	db.transaction(function(tx){ 	
		tx.executeSql( 
		//sql init
		"CREATE TABLE IF NOT EXISTS 'products' ('code'  INTEGER NOT NULL,'liked'  INTEGER NOT NULL DEFAULT 0,'categorized'  INTEGER NOT NULL DEFAULT 0,PRIMARY KEY ('code' ASC),CONSTRAINT 'code' UNIQUE ('code' ASC) ON CONFLICT ABORT);"
		//sql end
		,nullHandler,nullHandler);},errorHandler,successCallBack); 
	db.transaction(function(tx){ 	
		tx.executeSql( 
		//sql init
		"CREATE TABLE IF NOT EXISTS 'lists_products' ('quantity'  INTEGER NOT NULL DEFAULT 0,'scaned'  INTEGER NOT NULL DEFAULT 0,'products_id'  INTEGER NOT NULL,'lists_id'  INTEGER NOT NULL,PRIMARY KEY ('products_id', 'lists_id'),CONSTRAINT 'products_id' FOREIGN KEY ('products_id') REFERENCES 'products' ('code') ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT 'lists_id' FOREIGN KEY ('lists_id') REFERENCES 'lists' ('id') ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT 'id' UNIQUE ('lists_id', 'products_id') ON CONFLICT ABORT);"
		//sql end
		,nullHandler,nullHandler);},errorHandler,successCallBack); 
} 

