appCart.views.ShoppingCart = Ext.extend(Ext.Panel, {

	layout : 'fit',
	dockedItems : [{
		xtype : 'toolbar',
		title : 'Carrito',
		items : [{
			text : 'Inicio',
			ui : 'back',
			listeners : {
				'tap' : function() {
					Ext.dispatch({
						controller : appCart.controllers.shoppingCart,
						action : 'index'
					});
				}
			}
		}, {
			xtype : 'spacer'
		}, {
			text : 'Escanear',
			ui : 'action',
			listeners : {
				'tap' : function() {
					Ext.dispatch({
						controller : appCart.controllers.shoppingCart,
						action : 'scanProduct'
					});
				}
			}
		}]
	}, {
		id : 'sc_bpresupuesto',
		xtype: 'toolbar',
        ui: 'light',
        dock: 'bottom',
		items:  []
	},{
		id: 'sc_btotal',
		xtype : 'toolbar',
		dock: 'bottom',
		layout: {
		    align: 'right' // align center is the default
		},
		ui: 'light',	
		items : [{
			text : 'Vaciar',
			ui : 'action',
			listeners : {
				'tap' : function() {
					Ext.dispatch({
						controller : appCart.controllers.shoppingCart,
						action : 'index'
					});
				}
			}
		}, {
			xtype : 'spacer'
		}]
	}],
	items : [{
		xtype : 'list',
		store : appCart.stores.cartProducts,
		itemTpl : '<strong>{name}</strong> <br />{quantity}x{price} - {subtotal} ',
		listeners : {
			'itemTap' : function(thiss,i,el,e) {
				this.record  = thiss.store.getAt(i);
				if(!this.actions) {
					this.actions = new Ext.ActionSheet({
						items : [
						{
							text : 'Cancelar',
							scope : this,
							handler : function() {
								this.actions.hide();
							}
						},{
							text : 'Ver detalle',
							scope : this,
							handler : function() {
								Ext.dispatch({
									controller : appCart.controllers.shoppingCart,
									action : 'productView',
									bar_code : this.record.get('bar_code')
								});
								this.actions.hide();
							}
						},
						{
							text : 'Borrar',
							ui : 'decline',
							scope : this,
							handler : function() {
								if (confirm('Seguro que deseas borrar este elemento'))
									appCart.stores.cartProducts.remove(this.record);
								
								this.actions.hide();
							}
						}]
					});
				}

				this.actions.show();

			}
		},
		onItemDisclosure : function(record) {
			console.log(record.get('name'));
			Ext.dispatch({
				controller : appCart.controllers.shoppingCart,
				action : 'productView',
				bar_code : record.get('bar_code')
			});
		},
	}],
	initComponent : function() {
		appCart.stores.cartProducts.load();
		appCart.views.ShoppingCart.superclass.initComponent.apply(this, arguments);
	},
	setList : function(list) {
		appCart.views.shoppingCart.list = list;
	},
	updateTotal: function( total ) {
		var subt = this.getDockedItems()[1];
		var toolbar = this.getDockedItems()[2];
    	
    	var $l = appCart.views.shoppingCart.list;
    	if ($l) {
    		subt.setVisible(true);
    		subt.setTitle('Pres. Q. ' + $l.data.budget);
    		toolbar.setTitle('Q.' + total);
    	} else {
    		subt.setVisible(false);
    		toolbar.setTitle('Total Q.' + total);
    	}
	}
});
