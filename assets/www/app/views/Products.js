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
        store: appCart.stores.listProducts,
        listeners: {
	        /*itemTap: function(thiss,index,itemss,e) {
	        	console.log('index'+index);
	        	appCart.stores.ids.add({id:index,name:'index'});
	        	console.log("tapped")	
	        	Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'showProductMainPage'
                       }); 
        	}*/
        },
        itemTpl: '{name} <br />Cantidad: {quantity}'
        
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});