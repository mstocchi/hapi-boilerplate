const Joi = require('Joi')
const controllers = require('../controllers');

module.exports = [{
    method: 'GET',
    path: '/category',
    handler: controllers.categories.get
  }
];