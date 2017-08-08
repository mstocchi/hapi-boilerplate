const Joi = require('Joi')
const controllers = require('../controllers');

module.exports = [{
    method: 'GET',
    path: '/echo/{name}',
    handler: controllers.users.echo
  }]