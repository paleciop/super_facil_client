appCart.views.MyList = Ext.extend(Ext.Panel, {
    
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
                id: 'new',
                text: 'Nueva Lista',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'new'
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
        itemTpl: '{name}',
        onItemDisclosure: function (record) {
            //Ext.dispatch({
            //    controller: app.controllers.shoppingLists,
            //    action: 'show',
            //    id: record.getId()
            //});
        }
    }
    ],
    initComponent: function() {
    	//appCart.stores.productList.load();
    	
    	appCart.views.MyList.superclass.initComponent.apply(this, arguments);
    }
});