app.views.MainScreen = Ext.extend(Ext.Panel, {
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
		                controller: app.controllers.shoppingLists,
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
		                controller: app.controllers.shoppingCart,
		                action: 'viewItems',
		                animation: {type:'slide', direction:'right'}
		            });
        		}
    		}
    	}),
    	{xtype:'spacer'}
    	
    ],
    initComponent: function() {
        app.views.MainScreen.superclass.initComponent.apply(this, arguments);
    }
});