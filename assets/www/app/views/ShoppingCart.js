app.views.ShoppingCart = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Producto',
        items: [
         	{
                text: 'Inicio',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'index'
                        });
                    }
                }
            },
            {xtype:'spacer'},
            {
                id: 'view_shopping_cart',
                text: 'Escanear',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: app.controllers.shoppingCart,
                           action: 'scanProduct'
                        });
                    }
                }
            }
        ]
    }],
    items: [],
    html: 'Aqui se va la lista y el presupuesto y esas ondas',
    initComponent: function() {
        app.views.ShoppingCart.superclass.initComponent.apply(this, arguments);
    }
});