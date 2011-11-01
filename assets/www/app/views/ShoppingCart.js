appCart.views.ShoppingCart = Ext.extend(Ext.Panel, {
    
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
                           controller: appCart.controllers.shoppingCart,
                           action: 'index'
                        });
                    }
                }
            },
            {xtype:'spacer'},
            {
                id: 'scan_product',
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
    items: [],
    html: 'Aqui se va la lista y el presupuesto y esas ondas',
    initComponent: function() {
        appCart.views.ShoppingCart.superclass.initComponent.apply(this, arguments);
    }
});