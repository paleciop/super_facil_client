Ext.data.ProxyMgr.registerType("categorystorage", Ext.extend(Ext.data.Proxy, {
	create : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();

		for(var i = 0; i < operation.records.length; i++) {
			var category = operation.records[i].data;

			DatabaseHelper.db.transaction(function(tx) {
				tx.executeSql("INSERT INTO 'categories' (id,name) VALUES (?, ?);", [category.id, category.budget], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving category - ' + err.message);
				});
				//operation.records[i].data.id = DatabaseHelper.getLastInsertRowId(tx);
			});
		}
	},
	read : function(operation, callback, scope) {
		var thisProxy = this;

		DatabaseHelper.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM categories;', [], function(transaction, results) {
				var categories = [];

				for(var i = 0; i < results.rows.length; i++) {
					row = results.rows.item(i);
					var category = new thisProxy.model({
						id : row['id'],
						name : row['name'],
					})
					categories.push(category);
				}

				operation.resultSet = new Ext.data.ResultSet({
					records : categories,
					total : categories.length,
					loaded : true
				});
				//announce success
				operation.setSuccessful();
				operation.setCompleted();
				//finish with callback
				if( typeof callback == "function") {
					callback.call(scope || thisProxy, operation);
				}
			}, function(err) {
				console.log('Proxy categorystorage - failed to fetch categories. Error ' + err.message);
			});
		});
	},
	update : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();
		DatabaseHelper.db.transaction(function(tx) {
		for(var i = 0; i < operation.records.length; i++) {
			var category = operation.records[i].data;

			
				tx.executeSql("UPDATE 'categories' SET name = ? WHERE id = ?;", [category.name category.id], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving category - ' + err.message);
				});
		}
		});
	},
	destroy : function(operation, callback, scope) {
		var records = operation.records, length = records.length;

		//newIds is a copy of ids, from which we remove the destroyed records
		
		DatabaseHelper.db.transaction(function(tx){
			for(var i = 0; i < length; i++) {
				tx.executeSql("DELETE FROM categories WHERE id=?;", [records.data.id]);
			}
		});
		if( typeof callback == 'function') {
			callback.call(scope || this, operation);
		}

	}
}));

appCart.models.Category = Ext.regModel('appCart.models.Category', {
	fields : [{
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}],
	proxy : {
		type : "categorystorage"
	}
});

appCart.stores.categories = new Ext.data.Store({
	model : 'appCart.models.Category',
});
