app.views.ShoppingLists = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Mis listas'
    }],
    items: [],
    initComponent: function() {
        app.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});