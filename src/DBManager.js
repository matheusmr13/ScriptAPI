var DBManager = {};
var _recreateDB = false;
var _entitiesMap = {};
var _createDB = function(db) {
  var sheets = db.getSheets();
  for (var i = 1;i < sheets.length;i++) {
    db.deleteSheet(sheets[i]);
  }
  var first = true;
  for (var i in Entities) {
    if (first) {
      var sheet = db.getSheets()[0];
      if (sheet.getMaxRows() > 1) {
        sheet.setName(i);
        sheet.deleteRows(2, sheet.getMaxRows()-1);
      } else {
        sheet.getRange(1, 1,1, 1000).clear();
        
      }
      first = false;
    } else {
      var newSheet = db.insertSheet(i);
      newSheet.deleteRows(1, newSheet.getMaxRows()-1);
    }
  }
};
var _loadDB = function(db) {
  var sheets = db.getSheets();
  for (var i = 0;i < sheets.length;i++) {
    _entitiesMap[sheets[i].getName()] = sheets[i];
  }
};
DBManager.getDBConnection = function(endpoint) {
  Logger.log(endpoint);
  var db = SpreadsheetApp.open(DriveApp.getFileById('1qDnKYJcrUljvQgR2zfVZRhzxpEFSXRvm67f2aLHs8Vs'));
  if (_recreateDB) {
    _createDB(db);
  }
  _loadDB(db);
  return {
    save: function(entity) {
      var actualSheet = _entitiesMap[endpoint];
      var row = actualSheet.getMaxRows();
      if (!entity.id) {
        var column = 1;
        actualSheet.insertRowAfter(row);
        entity.id = row;
      } else {
        row = entity.id;
      }
      
      for (var i in entity) {
        actualSheet.getRange(row, column++).setValue(entity[i]);
      }
    },
    get : function(id) {
      var actualSheet = _entitiesMap[endpoint];
      return actualSheet.getRange(id, 1,1,actualSheet.getMaxColumns()).getValues();
    }
  };
};