app.views.ProductView = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Producto',
        items: [
         	{
                text: 'Escanear de nuevo',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'scanProduct'
                        });
                    }
                }
            },
            {xtype:'spacer'},
            {
                id: 'view_shopping_cart',
                text: 'Ver Carrito',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'viewItems'
                        });
                    }
                }
            }
        ]
    }],
    items: [],
    html: '<br /><br /><h1>The product couldn\'t be scanned</h1>',
    initComponent: function() {
        app.views.ProductView.superclass.initComponent.apply(this, arguments);
    }
});