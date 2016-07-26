function simulateGet() {
  var e = {};
  e.parameter = {
    path: '/Person/2'
  };
  Logger.log(doGet(e).getContent());
}
function doGet(e) {
  var path = e.parameter.path;
  if (!path) {
    return ContentService.createTextOutput('Invalid URL!');
  }
  var parts = path.split('/');
  var endpoint = parts[1];
  var id = parts[2];
  Logger.log(JSON.stringify(parts) + '    ' + endpoint + '     ' + id);
  var service = Services[endpoint + 'Service'];
  
  if (id) {
    var dbConnection = DBManager.getDBConnection(endpoint);
    var values = dbConnection.get(id);
    return ContentService.createTextOutput(JSON.stringify(values));
      } else {
      }
  //
  //dbConnection.save(new Entities.Person({name:'Maria',age:'32131'}));
}

function doPost() {
  var path = e.parameter.path;
  if (!path) {
    return ContentService.createTextOutput('Invalid URL!');
  }
}