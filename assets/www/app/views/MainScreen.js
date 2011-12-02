appCart.views.MainScreen = Ext.extend(Ext.Panel, {
    layout: {
    	type: 'vbox',
    	pack: 'center',
    	align: 'stretch'
    },
    items: [
    	{xtype:'spacer'}
    	,
    	new Ext.Button({
    		text: 'Listas de compra',
    		ui: 'action',
    		centered: true,
    		listeners: {
    			'tap': function () {
		            Ext.dispatch({
		                controller: appCart.controllers.shoppingLists,
		                action: 'index',
		                animation: {type:'slide', direction:'right'}
		            });
        		}
    		}
    	}),
    	{xtype:'spacer'}
    	,
    	new Ext.Button({
    		text: 'Realizar mi compra',
    		ui: 'action',
    		centered: true,
    		listeners: {
    			'tap': function () {
		            Ext.dispatch({
		                controller: appCart.controllers.shoppingCart,
		                action: 'selectList',
		                animation: {type:'slide', direction:'right'}
		            });
        		}
    		}
    	})
    	/*
    	,
    	{xtype:'spacer'},
    	new Ext.Button({
    		text: 'Debug Mode',
    		ui: 'action',
    		centered: true,
    		listeners: {
    			'tap': function () {
		            window.location.href = 'debug.html';
        		}
    		}
    	}),*/
    	,{xtype:'spacer'}
    	
    	
    ],
    initComponent: function() {
        appCart.views.MainScreen.superclass.initComponent.apply(this, arguments);
    }
});