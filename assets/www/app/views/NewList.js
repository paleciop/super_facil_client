appCart.views.NewList = Ext.extend(Ext.form.FormPanel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'New Contact',
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
            {xtype:'spacer'},
            {
                id: 'new',
                text: 'Nueva Lista',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        
                    }
                }
            }
        ]
    }],
    submitOnAction: false,
    items: [{
        name : 'listName',
        label: 'Nombre',
        xtype: 'textfield'
    }, {
        name : 'listBudget',
        label: 'Presupuesto',
        xtype: 'textfield'
    }]
});