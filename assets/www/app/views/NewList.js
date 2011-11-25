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
                    	console.log(listNew.getValues().name);
                    	var list  = Ext.ModelMgr.create(listNew.getValues(),'appCart.models.List'); 
                        list.save();
                        /*
                        var data = {id:'1',name:'lacteos'};
                        console.log(data.name);
                        
                        var category  = Ext.ModelMgr.create(data,'appCart.models.Category'); 
                        console.log("after category assignation");
                        category.save();
                        console.log("after category save");
                        */
                        /*
						var datos = {bar_code:'1234',name:'zucaritas',url_image:'no',likes:'0',category_id:'1'};
						console.log(datos.name);
						var producto = Ext.ModelMgr.create(datos,'appCart.models.Product');
						producto.save()
						*/
                        Ext.Msg.alert('Lista', 'Se ha guardado la lista.', Ext.emptyFn);

                        Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'index'
                        });
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