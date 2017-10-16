const Joi = require('Joi')
const controllers = require('lib/controllers');

module.exports = [{
    method: 'GET',
    path: '/category',
    handler: controllers.categories.get,
    config: {
      description: 'get all users',
      notes: 'return user array',
      tags: ['api', 'user'], // ADD THIS TAG
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Success',
              'schema': {}
            },
            '400': {
              'description': 'Bad Request'
            },
            '404': {
              'description': 'Not found'
            }
          }
        }
      },
      validate: {
        headers: Joi.object().keys({
          authorization: Joi.string().required().description('jwt token')
        }).unknown()
      }
    }
  }
];