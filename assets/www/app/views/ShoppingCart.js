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
	},{
		xtype : 'toolbar',
		dock: 'bottom',
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
				var record  = thiss.store.getAt(i);
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
									bar_code : record.get('bar_code')
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
									appCart.stores.cartProducts.remove(record);
								
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
	}
});
