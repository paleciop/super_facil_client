Ext.regApplication({
    name: 'appCart',
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        //if (!device || !this.launched) {return;}
        console.log('App - mainLaunch: Initializing App');
        this.views.viewport = new this.views.Viewport();
        
        DatabaseHelper.init();
    }
});