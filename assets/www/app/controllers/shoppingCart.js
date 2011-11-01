appCart.controllers.shoppingCart = new Ext.Controller({
    index: function(options) {
    	
    	appCart.views.viewport.setActiveItem(
            appCart.views.mainScreen, options.animation
        );
        
    },
    productView: function(options) {
    	var $product = null;
    	/*
    	 * get  product logic
    	 */
    	if (!$product) {
	    	appCart.views.viewport.setActiveItem(
	    		appCart.views.productFail, options.animation
	    	);
	    } else {
	    	appCart.views.viewport.setActiveItem(
	    		appCart.views.productView, options.animation
	    	);
	    }
    },
    productFail: function(options) {
    	appCart.views.viewport.setActiveItem(
    		appCart.views.productFail, options.animation
    	);
    },
    viewItems: function (options) {
    	appCart.views.viewport.setActiveItem(
    		appCart.views.shoppingCart, options.animation
    	);	
    },
    scanProduct: function(options) {
    	window.plugins.barcodeScanner.scan( BarcodeScanner.Type.QR_CODE, function(result) {
			        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'productView', 
                           id: result
                     });
			        
			    }, function(error) {
			        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'productFail'
                     });
			    }, {yesString: "Install"}
			);
    }
});