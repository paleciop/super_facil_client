appCart.views.ShoppingLists = Ext.extend(Ext.Panel, {
    
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Mis listas',
        items: [
         	{
                text: 'Regresar',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingCart,
                           action: 'index'
                        });
                    }
                }
            },
            {xtype:'spacer'},
            {
                id: 'new',
                text: 'Nueva Lista',
                ui: 'action',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                           controller: appCart.controllers.shoppingLists,
                           action: 'new'
                        });
                    }
                }
            }
        ]
    }],
    items: [
    
     {
        xtype: 'list',
        store: appCart.stores.lists,
        listeners: {
	        itemTap: function(thiss,index,itemss,e) {
	        	var currentRecord = thiss.getStore().getAt(index);
	        	var recordID = currentRecord.get('id');
	        	
	        	console.log('tap!')
	            if (!this.actions) {
	                this.actions = new Ext.ActionSheet({
	                    items: [
	                    {
	                        text: 'Ver',
	                        scope : this,
	                        handler : function(){
	                        	Ext.dispatch({
                           			controller: appCart.controllers.shoppingLists,
                           			action: 'showProducts',
                           			
                           			name: currentRecord.get('name')
                           			
                        		});
	                        	//console.log(this.getActiveItem());
	                        	// var activeList = thiss.getActiveItem();
            					//recordd = activeList.getSelectedRecords()[0];
								//console.log(recordd.get('name'));
								this.actions.hide();
	                        }
	                    },{
	                        text: 'Borrar',
	                        ui: 'decline',
	                        scope : this,
	                        handler : function(){
	                        	
                    			console.log(currentRecord.get('id'));
                    			appCart.models.List.destroy(currentRecord);
	                        	//console.log(this.getActiveItem());
	                        	// var activeList = thiss.getActiveItem();
            					//recordd = activeList.getSelectedRecords()[0];
								//console.log(recordd.get('name'));
								this.actions.hide();
	                        }
	                    },{
	                        text : 'Editar',
	                        scope : this,
	                        handler : function(){
	                        	Ext.dispatch({
                           			controller: appCart.controllers.shoppingLists,
                           			action: 'showCategories',
                           			
                        		});
                        		this.actions.hide();
	                        },
	                        
	                    },{
	                        text : 'Cancel',
	                        scope : this,
	                        handler : function(){
	                            this.actions.hide();
	                        }
	                    }]
	                });
	            }
            
            this.actions.show();
            }
        },
        itemTpl: '{name}{id}',
        onItemDisclosure: function (record) {
        	console.log(record.get('name'));
        	
        	$list = record.get('id');
        	console.log("list "+$list);
            Ext.dispatch({
                controller: appCart.controllers.shoppingLists,
                action: 'show',
                id: record.get('id')
            });
        },
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});