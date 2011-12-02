appCart.controllers.shoppingCart = new Ext.Controller({
    index: function(options) {
    	
    	appCart.views.viewport.setActiveItem(
            appCart.views.mainScreen, options.animation
        );
        
    },
    productView : function(options) {


		$product = appCart.stores.cartProducts.findRecord('bar_code', options.bar_code);
		
		if(!$product) {
			appCart.views.viewport.setActiveItem(appCart.views.productFail, options.animation);
		} else {
			appCart.views.productView.updateWithRecord($product);
			appCart.views.viewport.setActiveItem(appCart.views.productView, options.animation);
		}
	},
    productFail: function(options) {
    	appCart.views.viewport.setActiveItem(
    		appCart.views.productFail, options.animation
    	);
    },
    selectList: function (options) {
    	
    	appCart.stores.lists.load();
    	appCart.views.viewport.setActiveItem(
    		appCart.views.selectList, options.animation
    	);	
    },
    viewItems: function (options) {
    	var total = 0;
    	appCart.stores.cartProducts.each(function(record){
    		total += record.data.price * record.data.quantity;
    		return true;
    	},this);
    	
    	appCart.views.shoppingCart.updateTotal(total);
    	appCart.views.viewport.setActiveItem(
    		appCart.views.shoppingCart, options.animation
    	);	
    },
    scanProduct : function(options) {
		window.plugins.barcodeScanner.scan(BarcodeScanner.Type.ALL_CODE_TYPES, function(result) {
			var $product = appCart.stores.cartProducts.findRecord('bar_code',result);
			console.log('BARCODE - code' + result);
			if (!$product){
				jQuery.ajax({
					 async:	false,
					 url: $host + $services.getSingleProduct,
					 data: {
					 	bar_code : result
					 }, 
					 success: function($data){
					 	if (!$data.product) {
					 		Ext.dispatch({
							controller : appCart.controllers.shoppingCart,
							action : 'productFail'
						});
						return
					 	}
					 	$data.product.quantity = 1;
					 	var $r = appCart.stores.cartProducts.add($data.product);
					 	$r[0].save();
					 	appCart.stores.cartProducts.load();
					 	console.log('fuck yea3' + $data.product);
					 	$product = appCart.stores.cartProducts.findRecord('bar_code',result);
					 	console.log('fuck yea4' + $product);
					 	//appCart.views.productView.updateWithRecord($product);
					 	console.log('fuck yea5');
					 	Ext.dispatch({
							controller : appCart.controllers.shoppingCart,
							action : 'productView',
							bar_code : result
						});
					 }, error: function() {
					 	console.log('BARCODE - service failed' + result);
					 	Ext.dispatch({
							controller : appCart.controllers.shoppingCart,
							action : 'productFail'
						});
					 }
				});
			} else {
				console.log('fuck yea 2');
				$product.set('quantity',$product.get('quantity') + 1);
				$product.save();
				appCart.views.productView.updateWithRecord($product);
				Ext.dispatch({
					controller : appCart.controllers.shoppingCart,
					action : 'productView',
					bar_code : result
				});
			}

		}, function(error) {
			Ext.dispatch({
				controller : appCart.controllers.shoppingCart,
				action : 'productFail'
			});
		}, {
			yesString : "Install"
		});
	}
});