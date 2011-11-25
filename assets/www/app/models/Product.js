var my_url = $host + $services['getProduct'];
console.log(my_url);
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


appCart.stores.products = new Ext.data.Store({
	model : 'appCart.models.Product',
	data: [
	{bar_code:'12345',name:'zucaritas1',url_image:'no',likes:'0',category_id:'1'},
	{bar_code:'12345',name:'zucaritas2',url_image:'no',likes:'0',category_id:'1'},
	{bar_code:'12345',name:'zucaritas3',url_image:'no',likes:'0',category_id:'2'},
	{bar_code:'12346',name:'zucaritas4',url_image:'no',likes:'0',category_id:'2'},
	{bar_code:'12347',name:'zucaritas5',url_image:'no',likes:'0',category_id:'3'}
	
	
	],
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

ppCart.models.idsModel = Ext.regModel('appCart.models.Product', {
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

