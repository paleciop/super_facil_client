var DatabaseHelper = {
	db: null,
	dbSupported: false,
	_defaultOptions: {
		shortName: 'WebSqlDB',
		version : '1.0',
		displayName : 'WebSqlDB', 
		maxSize : 512000
	},
	init: function(options) {
		if (!options) {
			options = {};
		}
		var _options = jQuery.extend({},DatabaseHelper._defaultOptions,options);
		console.log('DB - Initializing DatabaseHelper');
		
		if (!window.openDatabase) { 
			console.log('DB - Browser doesn\'t support databases');
			return false;
		} 
		
		DatabaseHelper.dbSupported = true;
		DatabaseHelper.db = openDatabase(
								_options.shortName, 
								_options.version, 
								_options.displayName,
								_options.maxSize
							); 
		
		if (!DatabaseHelper.db) {
			console.log('DB - Failed to load database.');
			return false;
		}
		
		DatabaseHelper.install();
		
		return true;
	},
	install: function() {
		db.transaction(function(tx){ 
	
			tx.executeSql( 
				"CREATE TABLE IF NOT EXISTS 'lists' (" + 
				"'id'  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL COLLATE BINARY  DEFAULT 0," + 
				"'name'  TEXT NOT NULL," + 
				"'budget'  INTEGER NOT NULL,UNIQUE ('id' ASC) ON CONFLICT ABORT);"
			);  
			tx.executeSql( 
				"CREATE TABLE IF NOT EXISTS 'products' (" +
				"'code'  INTEGER NOT NULL," +
				"'liked'  INTEGER NOT NULL DEFAULT 0," + 
				"'categorized'  INTEGER NOT NULL DEFAULT 0," + 
				"PRIMARY KEY ('code' ASC),CONSTRAINT 'code' UNIQUE ('code' ASC) ON CONFLICT ABORT);"
			);
			tx.executeSql( 
				"CREATE TABLE IF NOT EXISTS 'lists_products' (" +
				"'quantity'  INTEGER NOT NULL DEFAULT 0," +
				"'scaned'  INTEGER NOT NULL DEFAULT 0," +
				"'products_id'  INTEGER NOT NULL," +
				"'lists_id'  INTEGER NOT NULL," +
				"PRIMARY KEY ('products_id', 'lists_id')," +
				"CONSTRAINT 'products_id' FOREIGN KEY ('products_id') REFERENCES 'products' ('code') ON DELETE CASCADE ON UPDATE CASCADE," +
				"CONSTRAINT 'lists_id' FOREIGN KEY ('lists_id') REFERENCES 'lists' ('id') ON DELETE CASCADE ON UPDATE CASCADE," +
				"CONSTRAINT 'id' UNIQUE ('lists_id', 'products_id') ON CONFLICT ABORT);"
			);
		},
		function(err) {
			console.log('DB - Failed to install database, Error: ' + err.message + '. Code: ' + err.code);
		},
		function() {
			console.log('DB - Database installed successful');
		});
	},
	uninstall: function() {
		db.transaction(function(tx){
			tx.executeSql('DROP TABLE IF EXISTS DEMO');

		},
		function(err){
			console.log('DB - Failed to uninstall database, Error: ' + err.message + '. Code: ' + err.code);
		},
		function() {
			console.log('DB - Database uninstalled successful');
		});
	
	}
	
}
