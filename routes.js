const controllers = require('./controllers');

module.exports = [
  {
    method: 'GET',
    path: '/user',
    handler: controllers.users.get
  },
  {
    method: 'GET',
    path: '/salute/{name}',
    handler: controllers.users.salute
  },
  {
    method: 'GET',
    path: '/category',
    handler: controllers.categories.get
  }
];
