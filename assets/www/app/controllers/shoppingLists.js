appCart.controllers.shoppingLists = new Ext.Controller({
    index: function(options) {
    	console.log('View - Loading ShoppingLists view');
    	appCart.stores.lists.load();
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
    	console.log("A: "+options.id);
    	appCart.views.myList.setId(options.id);
    	appCart.views.viewport.setActiveItem(
    		appCart.views.myList, options.animation
    	);	
    },
    edit: function(options) {
    },
    update: function(options) {
    	
    }
});