const Joi = require('Joi')
const controllers = require('../controllers');

module.exports = [{
    method: 'GET',
    path: '/user',
    handler: controllers.users.get,
    config: {
      auth: 'jwt',
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
  },
  {
    method: ['GET'],
    path: '/user/{id}',
    handler: controllers.users.get,
    config: {
      auth: 'jwt',
      description: 'get user from id',
      notes: 'return a User',
      tags: ['api','user'],
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
          authorization: Joi.string().required().description('jwt token')}).unknown(),
        params: {
          id: Joi.string()
                    .required()
                    .description('user id')
        }
      }
    }
  }
];