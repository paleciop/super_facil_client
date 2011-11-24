appCart.views.Products = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Productos',
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
        store: function(){appCart.stores.products.filter('name','zucaritas1')},
        listeners: {
	        itemTap: function(thiss,index,itemss,e) {
	        	console.log("tapped")	
        	}
        },
        itemTpl: '{name}{id}',
        
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});