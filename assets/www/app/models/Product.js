appCart.models.Product = Ext.regModel('appCart.models.Product', {
	fields : [{
		name : 'bar_code',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'url_image',
		type : 'string'
	},{
		name : 'likes',
		type : 'int'
	},{
		name : 'category_id',
		type : 'int'
	}],
	proxy : {
		type : 'ajax',
		url: $host + $services['getProduct'],
		reader: {
			root: 'products',
			type: 'json'
		}
	}
});

appCart.stores.products = new Ext.data.Store({
	model : 'appCart.models.Product',
	data: [{"bar_code":"088169004237","name":"Nescafe Cl\u00e1sico","url_image":null,"likes":null,"category_id":"2"},{"bar_code":"1234","name":"Nivea Leche","url_image":"","likes":null,"category_id":"3"},{"bar_code":"2345","name":"Leche Australian","url_image":null,"likes":null,"category_id":"4"},{"bar_code":"3456","name":"Huggies","url_image":null,"likes":null,"category_id":"1"},{"bar_code":"4567","name":"Zucaritas","url_image":null,"likes":null,"category_id":"2"},{"bar_code":"8816900423","name":"Nescafe Cl\u00e1sico","url_image":"","likes":null,"category_id":"2"}],
	filters:[{property:'name',value:'zucaritas1'}], //intento fallido de filtro
	/*
	proxy : {
		type : 'ajax',
		url: my_url,
		reader: {
			root: 'products',
			type: 'json'
		}
	}
	*/
});




appCart.models.idsModel = Ext.regModel('appCart.models.Product', {
	fields : [{
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	
	}]
	/*
	proxy : {
		type : 'ajax',
		url: my_url,
		reader: {
			root: 'products',
			type: 'json'
		}
	}
	*/
	
});

//inicio del chapuz para pasar la info de un view a otro
appCart.stores.ids = new Ext.data.Store({
	model: appCart.models.idsModel,
	proxy: {
		type: 'sessionstorage',
		id: 'ids'
	}
});

appCart.models.idsModel = Ext.regModel('appCart.models.Product', {
	fields : [{
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	
	}]
	
});

//USO: antes de cargar la siguiente vista
//appCart.stores.ids.add({id:'1',name:'lacteos'});
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> :) a small win in a shitload of fails" );
//en la siguiente vista se recupera la info de la posicion 0 y se borra el record en la posicion 0
//console.log(appCart.stores.ids.getAt(0).get('id'));
//console.log(appCart.stores.ids.getAt(0).get('name'));
//appCart.stores.ids.removeAt(0);
