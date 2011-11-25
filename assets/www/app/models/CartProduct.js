appCart.models.CartProduct = Ext.regModel('appCart.models.CartProduct', {
	fields : [{
		name : 'bar_code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'url_image',
		type : 'string'
	},{
		name : 'price',
		type : 'float'
	},{
		name : 'quantity',
		type : 'int'
	},{
		name : 'subtotal',
		type : 'float'
	},	{
		name : 'in_list',
		type : 'int'
	},
	{	
		name : 'category_id',
		type : 'int'
	}],
	proxy : {
		type : 'localstorage',  
		id: 'cart-app-localstore'

	}
});

appCart.stores.cartProducts = new Ext.data.Store({
	model : 'appCart.models.CartProduct',
});

