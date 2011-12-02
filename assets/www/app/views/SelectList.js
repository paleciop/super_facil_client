appCart.views.SelectList = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Mis listas',
        items: [
         	{
                text: 'Regresar',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'index'
                        });
                    }
                }
            },
            {xtype:'spacer'},
            {
                text: 'Carrito',
                ui: 'forward',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'viewItems'
                        });
                    }
                }
            }
        ]
    }],
    items: [
    
     {
        xtype: 'list',
        store: appCart.stores.lists,
        itemTpl: '{name} Q.{budget}',
        onItemDisclosure: function (record) {
        	console.log(record.get('name'));
        	
        	$list = record.get('id');
        	console.log("list "+$list);
        	appCart.views.shoppingCart.setList(record);
            Ext.dispatch({
                controller: appCart.controllers.shoppingCart,
                action: 'viewItems',
                list:  record
            });
        },
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.SelectList.superclass.initComponent.apply(this, arguments);
    }
});