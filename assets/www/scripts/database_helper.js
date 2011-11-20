//OPEN DB
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 512000;
var db = openDatabase(shortName, version, displayName, maxSize);
var ready = false;
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	alert('Error: ' + error.message + ' code: ' + error.code);
}

// this is called when a successful transaction happens
function successCallBack() {
	console.log("DEBUGGING: success");
	//alert("DEBUGGING: success");
}

function nullHandler() {
};

//OPEN DB

function getLastInsertRowId(name) {
	var id = 0;
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT last_insert_rowid() as id', [], function(transaction, result) {
			id = result.rows.item(0).id;
		}, errorHandler);
	}, errorHandler, function() {
		alert("test:" + id + name);
		window.location = "categories.html?id=" + id + "&name=" + name;
	});
}

function newList(name, budget) {
	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	// inserts the values into the 'lists' table
	db.transaction(function(transaction) {
		transaction.executeSql("INSERT INTO 'lists' (name,budget) VALUES (?, ?);", [name, budget], getLastInsertRowId(name, testt), errorHandler);
	});
	return;
}

function newProduct(code, liked, categorized) {
	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	// inserts the values into the 'products' table
	db.transaction(function(transaction) {
		transaction.executeSql("INSERT INTO 'products' (code,liked,categorized) VALUES (?, ?, ?);", [code, liked ? 1 : 0, categorized ? 1 : 0], nullHandler, errorHandler);
	});
	return false;
}

function insertIntoListsProducts(quantity, scaned, products_id, lists_id) {
	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	// inserts the values into the 'products' table
	db.transaction(function(transaction) {
		transaction.executeSql("INSERT INTO 'lists_products' VALUES (?, ?, ?, ?);", [quantity, scaned ? 1 : 0, products_id, lists_id], nullHandler, errorHandler);
	});
	return false;
}

/*
 se usa para obtener los codigos de los productos asociados a esa lista.
 list_id es el id de la lista (captain obvious)
 onSuccess es la función que se llama cuando la transacción terminó, tiene un parametro: un json con los codigos obtenidos.
 ejemplo del json: {"codes":[12349,2134,213432]}
 */
function getProductsFromList(list_id, onSuccess) {

	var names = "";

	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM products p WHERE EXISTS(SELECT * FROM lists_products lp WHERE p.code = lp.products_id AND lp.lists_id = ' + list_id + ');', [], function(transaction, result) {
			var json = "{\"codes\":[";
			if(result != null && result.rows != null) {
				for(var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					json += row.code + ",";
				}
				json += "]}";
				json = json.replace(",]", "]");
				onSuccess(json);
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
}

//insert into lists_products values (?,?,id_list,id_product)

/*
 se usa para obtener el nombre y id de las listas (de todas)
 la funcion onSuccess se manda a llamar cuando está listo el resultado, su unico parametro es un json con
 los resultados:
 {"lists": [
 [1,"compras del mes"],
 [2,"test"],
 [3,"test2"]
 ]
 }

 */
function getListsNames(onSuccess) {

	var names = "";

	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT name,id FROM lists;', [], function(transaction, result) {
			var json = "{\"lists\":[";
			if(result != null && result.rows != null) {
				for(var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					json += "[" + row.id + ",\"" + row.name + "\"],";
					names += "<a href='list.html?id=" + row.id + "&name=" + row.name + "'>" + row.name + "<a><br/>";
				}
				json += "]}";
				json = json.replace(",]}", "]}");
				onSuccess(json);
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
}

//gets a parameter from the URL
function gup(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(decodeURI(window.location.href));
	if(results == null)
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
	if(!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM lists;', [], function(transaction, result) {
			$('#result').append('<b>lists</b><br/>');
			if(result != null && result.rows != null) {
				for(var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$('#result').append('<br>' + row.id + '. ' + row.name + ' ' + row.budget);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM products;', [], function(transaction, result) {
			$('#result').append('<br><b>products</b><br/>');
			if(result != null && result.rows != null) {
				for(var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$('#result').append('<br>' + row.code + ' ' + row.liked + ' ' + row.categorized);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM lists_products;', [], function(transaction, result) {
			$('#result').append('<br><b>lists_products</b><br/>');
			if(result != null && result.rows != null) {
				for(var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$('#result').append('<br>' + row.quantity + ' ' + row.scaned + ' ' + row.products_id + ' ' + row.lists_id);
				}
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
	return;
}