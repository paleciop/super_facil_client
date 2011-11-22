Ext.data.ProxyMgr.registerType("productstorage", Ext.extend(Ext.data.Proxy, {
	create : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();

		for(var i = 0; i < operation.records.length; i++) {
			var product = operation.records[i].data;
			
			DatabaseHelper.db.transaction(function(tx) {
				tx.executeSql("INSERT INTO 'products' (code,liked,categorized) VALUES (?, ?);", [product.name, product.budget], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving product - ' + err.message);
				});
				//operation.records[i].data.id = DatabaseHelper.getLastInsertRowId(tx);
			});
		}
	},
	read : function(operation, callback, scope) {
		var thisProxy = this;

		DatabaseHelper.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM products;', [], function(transaction, results) {
				var products = [];

				for(var i = 0; i < results.rows.length; i++) {
					row = results.rows.item(i);
					var product = new thisProxy.model({
						id : row['id'],
						name : row['name'],
						budget : row['budget']
					})
					products.push(product);
				}

				operation.resultSet = new Ext.data.ResultSet({
					records : products,
					total : products.length,
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
				console.log('Proxy productstorage - failed to fetch products. Error ' + err.message);
			});
		});
	},
	update : function(operation, callback, scope) {
		var thisProxy = this;

		operation.setStarted();

		for(var i = 0; i < operation.records.length; i++) {
			var product = operation.records[i].data;

			DatabaseHelper.db.transaction(function(tx) {
				tx.executeSql("UPDATE 'products' SET name = ?, budget = ? WHERE id = ?;", [product.name, product.budget, product.id], function() {
					operation.setCompleted();
					operation.setSuccessful();
					//finish with callback
					if( typeof callback == 'function') {
						callback.call(scope || thisProxy, operation);
					}
				}, function(err) {
					operation.setCompleted();
					console.log('DB - error saving product - ' + err.message);
				});
				
			});
		}
	},
	destroy : function(operation, callback, scope) {
		var records = operation.records, length = records.length;

		//newIds is a copy of ids, from which we remove the destroyed records
		

		for( i = 0; i < length; i++) {
			DatabaseHelper.db.transaction(function(tx){
				tx.executeSql("DELETE FROM products WHERE id=?;", [records.data.id]);
			});
		}

		if( typeof callback == 'function') {
			callback.call(scope || this, operation);
		}

	}
}));

appCart.models.Product = Ext.regModel('appCart.models.Product', {
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
		type : "productstorage"
	}
});

appCart.stores.products = new Ext.data.Store({
	model : 'appCart.models.Product',
});
