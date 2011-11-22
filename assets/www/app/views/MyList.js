appCart.views.MyList = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Lista ',
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
            {xtype:'spacer'}
            
        ]
    }],
    items: [
     {
        xtype: 'list',
        store: appCart.stores.categories,
        itemTpl: '{name} Err',
        onItemDisclosure: function (record) {
            //Ext.dispatch({
            //    controller: app.controllers.shoppingLists,
            //    action: 'show',
            //    id: record.getId()
            //});
        }
    }
    ],
    html: 'hola: ' + $list,
    setId: function(id) {
    	appCart.views.MyList.myId = id;
    	console.log("AAA: "+ this.myId);
    },
    initComponent: function() {
    	//appCart.stores.productList.load();
    	console.log("init: "+$list);
    	appCart.views.MyList.superclass.initComponent.apply(this, arguments);
    }
});