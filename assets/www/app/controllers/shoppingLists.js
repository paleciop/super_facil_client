app.controllers.shoppingLists = new Ext.Controller({
    index: function(options) {
    	
    	app.views.viewport.setActiveItem(
            app.views.shoppingLists, options.animation
        );
        
    },
    "new": function(options) {
    	app.views.viewport.setActiveItem(
    		app.views.newList, options.animation
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