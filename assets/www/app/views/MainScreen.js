app.views.MainScreen = Ext.extend(Ext.Panel, {
    layout: {
    	type: 'vbox',
    	pack: 'center',
    	align: 'stretch'
    },
    items: [
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
    	new Ext.Button({
    		text: 'Realizar mi compra',
    		ui: 'action',
    		centered: true
    	})
    ],
    initComponent: function() {
        app.views.MainScreen.superclass.initComponent.apply(this, arguments);
    }
});