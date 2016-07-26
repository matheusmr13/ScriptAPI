var Services = Services || {};
Services.PersonService = Services.PersonService || {};
Services.PersonService.create = function(params) {
  var person = new Entities.Person(params);
  DBManager.save(person);
};