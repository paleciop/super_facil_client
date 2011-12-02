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
});





