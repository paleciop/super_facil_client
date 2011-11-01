appCart.controllers.shoppingLists = new Ext.Controller({
    index: function(options) {
    	
    	appCart.views.viewport.setActiveItem(
            appCart.views.shoppingLists, options.animation
        );
        
    },
    "new": function(options) {
    	appCart.views.viewport.setActiveItem(
    		appCart.views.newList, options.animation
    	);
    },
    create: function(options) {
    	
    },	
    show: function(options) {
    },
    edit: function(options) {
    },
    update: function(options) {
    	
    }
});