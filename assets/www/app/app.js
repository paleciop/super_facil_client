Ext.regApplication({
    name: 'appCart',
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        //if (!device || !this.launched) {return;}
        this.views.viewport = new this.views.Viewport();
    }
});