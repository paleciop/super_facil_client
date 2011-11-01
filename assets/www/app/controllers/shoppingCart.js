app.controllers.shoppingCart = new Ext.Controller({
    index: function(options) {
    	
    	app.views.viewport.setActiveItem(
            app.views.mainScreen, options.animation
        );
        
    },
    productView: function(options) {
    	var $product = null;
    	/*
    	 * get  product logic
    	 */
    	if (!$product) {
	    	app.views.viewport.setActiveItem(
	    		app.views.productFail, options.animation
	    	);
	    } else {
	    	app.views.viewport.setActiveItem(
	    		app.views.productView, options.animation
	    	);
	    }
    },
    productFail: function(options) {
    	app.views.viewport.setActiveItem(
    		app.views.productFail, options.animation
    	);
    },
    viewItems: function (options) {
    	app.views.viewport.setActiveItem(
    		app.views.shoppingCart, options.animation
    	);	
    },
    scanProduct: function(options) {
    	window.plugins.barcodeScanner.scan( BarcodeScanner.Type.QR_CODE, function(result) {
			        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'productView', 
                           id: result
                     });
			        
			    }, function(error) {
			        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'productFail'
                     });
			    }, {yesString: "Install"}
			);
    }
});