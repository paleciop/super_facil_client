Ext.data.ProxyMgr.registerType("listsprodstorage", Ext.extend(Ext.data.Proxy, {
	create : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();

		for(var i = 0; i < operation.records.length; i++) {
			var list = operation.records[i].data;

			DatabaseHelper.db.transaction(function(tx) {
				tx.executeSql("INSERT INTO 'lists_products' (bar_code,list_id,name,quantity) VALUES (?,?,?,?);",
				 [list.bar_code, list.list_id,list.name, list.quantity], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log([list.bar_code, list.list_id,list.name, list.quantity].join());
					console.log('DB - error saving list - ' + err.message);
				});
				//operation.records[i].data.id = DatabaseHelper.getLastInsertRowId(tx);
			});
		}
	},
	read : function(operation, callback, scope) {
		var thisProxy = this;
		var list_id = this.extraParams.list_id;
		DatabaseHelper.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM lists_products WHERE list_id = ?;', [list_id], function(transaction, results) {
				var lists = [];

				for(var i = 0; i < results.rows.length; i++) {
					row = results.rows.item(i);
					var list = new thisProxy.model({
						bar_code : row['bar_code'],
						list_id : row['list_id'],
						name : row['name'],
						quantity : row['quantity']
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

			
				tx.executeSql("UPDATE 'lists_products' SET name = ?, quantity = ? WHERE bar_code = ? AND list_id = ? ;",
					 [list.name, list.quantity, list.bar_code,list.list_id], function() {
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
				tx.executeSql("DELETE FROM lists_products WHERE bar_code = ? AND list_id = ?;", [records[i].data.bar_code,records[i].data.list_id]);
				console.log('Deleting  lists_products ' + records[i].data.bar_code);
			}
			
		});
		operation.setCompleted();
					operation.setSuccessful();
		if( typeof callback == 'function') {
			callback.call(scope || this, operation);
		}

	}
}));

appCart.models.ListProduct = Ext.regModel('appCart.models.ListProduct', {
	fields : [{
		name : 'list_id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'bar_code',
		type : 'int'
	}, {
		name : 'quantity',
		type : 'int'
	}],
	proxy : {
		type : "listsprodstorage"
	}
});

appCart.stores.listProducts = new Ext.data.Store({
	model : 'appCart.models.ListProduct',
});
