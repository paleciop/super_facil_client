appCart.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into appCart.views namespace
        Ext.apply(appCart.views, {
        	mainScreen:	new appCart.views.MainScreen(),
        	shoppingLists:	new appCart.views.ShoppingLists(),
        	
        	//chooseList: new appCart.views.ChooseList(),
        	//showList: new appCart.views.ShowList(),
        	shoppingCart: new appCart.views.ShoppingCart(),
        	//productView: new appCart.views.ProductView(),
        	productFail: new appCart.views.ProductFail(),
        	newList:	new appCart.views.NewList(),
        	myList: new appCart.views.MyList(),
        	viewCategories: new appCart.views.ViewCategories(),
        	products: new appCart.views.Products(),
        	productMain: new appCart.views.ProductMain(),
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
            	appCart.views.mainScreen,
            	appCart.views.shoppingLists,
            	
            	//appCart.views.chooseList,
            	//appCart.views.showList,
            	appCart.views.shoppingCart,
            	//appCart.views.productView,
            	appCart.views.productFail,
            	appCart.views.newList,
            	appCart.views.myList,
            	appCart.views.viewCategories,
            	appCart.views.products,
            	appCart.views.productMain
            ]
        });
        appCart.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});