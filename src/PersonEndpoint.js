var PersonEndpoint = function() {
  this.doGet = function(e) {
    return ContentService.createTextOutput(PersonService.getById(e.parameters.id));
  };
  this.doPost = function() {
    return ContentService.createTextOutput(PersonService.create(e.parameters));
  };
};
