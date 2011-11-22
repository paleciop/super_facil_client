appCart.controllers.shoppingLists = new Ext.Controller({
    index: function(options) {
    	console.log('View - Loading ShoppingLists view');
    	appCart.stores.products.load();
    	appCart.views.viewport.setActiveItem(
            appCart.views.shoppingLists, options.animation
        );
        
    },
    "new": function(options) {
    	
    	appCart.views.viewport.setActiveItem(
    		appCart.views.newList, options.animation
    	);
    },	
    show: function(options) {
    	console.log('View - Loading List view');
    	appCart.views.viewport.setActiveItem(
    		appCart.views.myList, options.animation
    	);	
    },
    edit: function(options) {
    },
    update: function(options) {
    	
    }
});