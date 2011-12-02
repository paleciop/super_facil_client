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
                ui: 'forward',
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
	        'itemTap' : function(thiss,i,el,e) {
	        	this.record  = thiss.store.getAt(i);
	        	
	        	console.log('tap!'+  i + ',' + this.record.get('id'));
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
                           			id: this.record.get('id'),
                           			record: this.record                         			
                        		});
	                        	
								this.actions.hide();
	                        }
	                    },{
	                        text: 'Borrar',
	                        ui: 'decline',
	                        scope : this,
	                        handler : function(){
	                        	//if (confirm('Seguro que deseas borrar este elemento'))
	                        	console.log('borrar!'+  i + ',' + this.record.get('id'));
	                        	if (confirm('Seguro que deseas borrar este elemento')){
                    				appCart.stores.lists.remove(this.record);
                    				appCart.stores.lists.sync();
                    				appCart.stores.lists.load();
                    			}
	                        	//console.log(this.getActiveItem());
	                        	// var activeList = thiss.getActiveItem();
            					//recordd = activeList.getSelectedRecords()[0];
								//console.log(recordd.get('name'));
								this.actions.hide();
	                        }
	                    },{
	                        text : 'Agregar productos',
	                        scope : this,
	                        handler : function(){
	                        	Ext.dispatch({
                           			controller: appCart.controllers.shoppingLists,
                           			action: 'showCategories',
                           			id: this.record.get('id'),
                           			record: this.record
                        		});
                        		this.actions.hide();
	                        },
	                        
	                    },{
	                        text : 'Cancelar',
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
        itemTpl: '{name} Q.{budget}',
        onItemDisclosure: function (record) {
        	console.log(record.get('name'));
        	
        	$list = record.get('id');
        	console.log("list "+$list);
            Ext.dispatch({
                controller: appCart.controllers.shoppingLists,
                action: 'show',
                id: record.get('id'),
                record:  record
            });
        },
    }
    
     
    ],
    initComponent: function() {
    	//favorites_store.load();
    	
        appCart.views.ShoppingLists.superclass.initComponent.apply(this, arguments);
    }
});