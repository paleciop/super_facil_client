app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
        	mainScreen:	new app.views.MainScreen(),
        	shoppingLists:	new app.views.ShoppingLists(),
        	
        	//chooseList: new app.views.ChooseList(),
        	//showList: new app.views.ShowList(),
        	shoppingCart: new app.views.ShoppingCart(),
        	//productView: new app.views.ProductView(),
        	productView: new app.views.ProductFail(),
        	newList:	new app.views.NewList()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
            	app.views.mainScreen,
            	app.views.shoppingLists,
            	
            	//app.views.chooseList,
            	//app.views.showList,
            	app.views.shoppingCart,
            	//app.views.productView,
            	app.views.productFail,
            	app.views.newList
            ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});