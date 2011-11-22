appCart.views.NewList = Ext.extend(Ext.form.FormPanel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Nueva Lista',
        
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
                text: 'Guardar',
                ui: 'action',
                listeners: {
                    'tap': function () {
                    	var listNew = appCart.views.newList;
                    	
                        var list  = Ext.ModelMgr.create(listNew.getValues(),'appCart.models.List'); 
                        list.save();
                    }
                }
            }
        ]
    }],
    submitOnAction: false,
    items: [{
        name : 'name',
        label: 'Nombre',
        xtype: 'textfield'
    }, {
        name : 'budget',
        label: 'Presupuesto',
        xtype: 'textfield'
    }]
});