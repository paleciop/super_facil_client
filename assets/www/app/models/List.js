Ext.data.ProxyMgr.registerType("liststorage", Ext.extend(Ext.data.Proxy, {
	create : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();

		for(var i = 0; i < operation.records.length; i++) {
			var list = operation.records[i].data;

			DatabaseHelper.db.transaction(function(tx) {
				tx.executeSql("INSERT INTO 'lists' (name,budget) VALUES (?, ?);", [list.name, list.budget], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving list - ' + err.message);
				});
				//operation.records[i].data.id = DatabaseHelper.getLastInsertRowId(tx);
			});
		}
	},
	read : function(operation, callback, scope) {
		var thisProxy = this;

		DatabaseHelper.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM lists;', [], function(transaction, results) {
				var lists = [];

				for(var i = 0; i < results.rows.length; i++) {
					row = results.rows.item(i);
					var list = new thisProxy.model({
						id : row['id'],
						name : row['name'],
						budget : row['budget']
					})
					lists.push(list);
				}

				operation.resultSet = new Ext.data.ResultSet({
					records : lists,
					total : lists.length,
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
				console.log('Proxy liststorage - failed to fetch lists. Error ' + err.message);
			});
		});
	},
	update : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();
		DatabaseHelper.db.transaction(function(tx) {
		for(var i = 0; i < operation.records.length; i++) {
			var list = operation.records[i].data;

			
				tx.executeSql("UPDATE 'lists' SET name = ?, budget = ? WHERE id = ?;", [list.name, list.budget, list.id], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving list - ' + err.message);
				});
		}
		});
	},
	destroy : function(operation, callback, scope) {
		var records = operation.records;
		var length = records.length;
		
		operation.setStarted();
		//newIds is a copy of ids, from which we remove the destroyed records
		
		DatabaseHelper.db.transaction(function(tx){
			for(var i = 0; i < length; i++) {
				tx.executeSql("DELETE FROM lists WHERE id=?;", [records[i].data.id]);
				console.log('Deleting  lists ' + records[i].data.id);
			}
			
		});
		operation.setCompleted();
					operation.setSuccessful();
		if( typeof callback == 'function') {
			callback.call(scope || this, operation);
		}

	}
}));

appCart.models.List = Ext.regModel('appCart.models.List', {
	fields : [{
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'budget',
		type : 'int'
	}],
	proxy : {
		type : "liststorage"
	}
});

appCart.stores.lists = new Ext.data.Store({
	model : 'appCart.models.List',
});
