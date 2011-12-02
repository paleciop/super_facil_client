appCart.views.ViewCategories = Ext.extend(Ext.NestedList, {
	/*
	title : 'Categorias',
	
	
	layout: 'fit',*/
	useTitleAsBackText: true,
	displayField : 'name',
	store: appCart.stores.categories,
    backText : 'Regresar',
    toolbar: {
        items: [
         	
            {xtype:'spacer'},
            {
                text: 'Mis listas',
                //ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'index'
                        });
                    }
                }
            }
        ]
    },  
    listeners: {
    	'leafitemtap' : function(sublist, i,el,e, card) {
    		var $list_id = appCart.views.viewCategories.record.get('id');
    		
    		appCart.stores.listProducts.getProxy().extraParams = { list_id : $list_id}
    		
    		var bar_code = sublist.getStore().getAt(i).get('id');
    		var name  = sublist.getStore().getAt(i).get('name');
    		appCart.stores.listProducts.load();
    		var listprod = appCart.stores.listProducts.findRecord('bar_code', bar_code);
    		
    		if (listprod == null) {
    			listprod = Ext.ModelMgr.create({
    				list_id : $list_id, 
    				'bar_code': bar_code,
    				'name' : name,
    				'quantity' : 1 
    			 },'appCart.models.ListProduct'); 
    		} else {
    		    listprod.set('name',name);
    		    listprod.set('quantity',parseInt(listprod.get('quantity')) + 1);
    		}
    		 
            listprod.save();
            appCart.stores.listProducts.sync();
    		//alert(sublist.getStore().getAt(i).get('id'));
    		appCart.views.viewCategories.onBackTap();
    		// aqui va la logica para agregar un producto a la lista.
    	}
    },
    initComponent: function() {
    	//favorites_store.load();
    	console.log('init - view categories')
        appCart.views.ViewCategories.superclass.initComponent.apply(this, arguments);
    }
});