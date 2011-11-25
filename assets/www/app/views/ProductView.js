appCart.views.ProductView = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Producto',
        items: [
        	{
                id: 'view_shopping_cart',
                text: 'Carrito',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'viewItems'
                        });
                    }
                }
            },{xtype:'spacer'},
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
    },{
        xtype: 'toolbar',
        ui: 'light',
        dock: 'bottom',
        defaults: {
        	iconMask: true,
        	ui: 'plain'
        },
        items: [
        	{
        		id: 'sc_prod_trash',
                iconCls: 'trash',
                listeners: {
                    'tap': function () {
                    	appCart.stores.cartProducts.remove(this.record);
                    	
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'viewItems'
                        });
                    }
                }
            },
         	{xtype:'spacer'},
         	{
         		id: 'sc_prod_decr',
                iconCls: 'arrow_down',
                listeners: {
                    'tap': function () {
                    	var record = this.record;
                    	if (record.data.quantity > 0) {
                    		record.set('quantity',record.data.quantity - 1);
                    		record.save();
                    		appCart.views.productView.updateWithRecord(record);
                    	}
                        
                    }
                }
            },
            
            {
            	id: 'sc_prod_incr',
                iconCls: 'arrow_up',
                listeners: {
                    'tap': function () {
                        var record = this.record;
                    	
                    	record.set('quantity',record.data.quantity + 1);
                    	record.save();
                    	appCart.views.productView.updateWithRecord(record);
                    	
                    }
                }
            }
        ]
    }],
    items: [{
    	tpl: '<h3>{name}</h3>' +
    	'<table class="product_detail">' +
    	'<tr><th>C&oacute;digo</th><td>{bar_code}</td></tr>' +
    	'<tr><th>Precio</th><td>Q.{price}</td></tr>' +
    	'<tr><th>Cantidad</th><td>{quantity}</td></tr>' +
    	'<tr><th>Subtotal</th><td>Q.{[values.price * values.quantity]}</td></tr>' +
    	'</table>' 
    }],
    
    initComponent: function() {
        appCart.views.ProductView.superclass.initComponent.apply(this, arguments);
    },
    updateWithRecord: function(record) {
    	console.log('fuck yea7');
    	var toolbar = this.getDockedItems()[1];
    	toolbar.getComponent('sc_prod_incr').record = record;
    	toolbar.getComponent('sc_prod_decr').record = record;
    	toolbar.getComponent('sc_prod_trash').record = record;
		Ext.each(appCart.views.productView.items.items, function(item) {
		    item.update(record.data);
		});
	    
	    
	}
});