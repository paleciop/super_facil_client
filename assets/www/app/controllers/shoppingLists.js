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
    	console.log("Awert: "+options.id);
    	
    	appCart.views.viewport.setActiveItem(
    		appCart.views.myList, options.animation
    	);	
    },
    showCategories: function(options) {
    	console.log('View - Loading Categories view');
    	console.log("IDD: "+options.id);
    	console.log("NAMEE: "+options.name);
    	appCart.views.viewport.setActiveItem(
    		appCart.views.viewCategories, options.animation
    	);	
    },
    showProducts: function(options) {
    	console.log('View - Loading Products view');
    	console.log("IDD: "+options.id);
    	console.log("NAMEE: "+options.name);
    	appCart.views.viewport.setActiveItem(
    		appCart.views.products, options.animation
    	);	
    },
    edit: function(options) {
    },
    update: function(options) {
    	
    }
});