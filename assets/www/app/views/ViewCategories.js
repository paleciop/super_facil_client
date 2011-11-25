appCart.views.ViewCategories = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Categorias',
        items: [
         	{
                text: 'Regresar',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'index'
                        });
                    }
                }
            },
            {xtype:'spacer'}
        ]
    }],
    items: [
    
     {
        xtype: 'list',
        store: appCart.stores.categories,
        listeners: {
	        itemTap: function(thiss,index,itemss,e) {
	        	console.log("tapped");
	        	Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'showProducts'
                        });	
        	}
        },
        itemTpl: '{name}',
        
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});