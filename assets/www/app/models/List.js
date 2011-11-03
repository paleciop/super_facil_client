// Declare variable to use as data when instantiating store
var shortName = 'WebSqlDB'; 
var version = '1.0'; 
var displayName = 'WebSqlDB'; 
var maxSize = 512000; 
var db = openDatabase(shortName, version, displayName,maxSize); 
var lists = [];

// Set up datamodel

Ext.regModel('Lists', {
    fields: [

        {name: 'name',      type: 'string'},
        {name: 'budget',    type: 'int'}
    ]
});
var favorites_store = new Ext.data.Store({
  model  : 'Lists',
  data: lists
});
// Get the data from the database and call the function allDataSelectHandler when finished
function getFavorites(){
  db.transaction(
      function (transaction) {
          transaction.executeSql('SELECT name,id FROM lists;', [],  allDataSelectHandler);
      }
  );
}
function allDataSelectHandler(transaction, results){
 if (results.rows.length == 0){

} else {
// Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
          row = results.rows.item(i);
          favorites_store.add({'name':row['name'],'budget':row['budget']});
        //alert(row['code']);
     }
  }
}
getFavorites();
alert(lists);