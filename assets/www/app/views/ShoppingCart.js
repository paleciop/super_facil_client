appCart.views.ShoppingCart = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Carrito',
        items: [
         	{
                text: 'Inicio',
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
                text: 'Escanear',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'scanProduct'
                        });
                    }
                }
            }
        ]
    }],
    items: [{
        xtype: 'list',
        store: appCart.stores.cartProducts,
        itemTpl: '{name}',
        onItemDisclosure: function (record) {
        	console.log(record.get('name'));
            Ext.dispatch({
                controller: appCart.controllers.shoppingCart,
                action: 'productView',
                bar_code: record.get('bar_code')
            });
        },
    }
    ],
    initComponent: function() {
    	appCart.stores.cartProducts.load();
        appCart.views.ShoppingCart.superclass.initComponent.apply(this, arguments);
    }
});