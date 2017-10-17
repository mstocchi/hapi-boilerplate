const Joi = require('Joi')
const controller = require('./controller');

module.exports = [{
    method: 'GET',
    path: '/user',
    handler: controller.getUsers,
    config: {
      auth: false,
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
    method: 'POST',
    path: '/user',
    handler: controller.addUser,
    config: {
      auth: false,
      description: 'add a user',
      notes: 'ad an object user',
      tags: ['api', 'user'], 
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': 'Success',
              'schema': {}
            },
            '400': {
              'description': 'Bad Request'
            },
            '404': {
              'description': 'Not found'
            }
          },
          validate: {
            
          }
        }
      }
    }
  },
  {
    method: ['GET'],
    path: '/user/{id}',
    handler: controller.getUser,
    config: {
      auth: false,
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
        params: {
          id: Joi.string()
                    .required()
                    .description('user id')
        }
      }
    }
  },
/* headers: Joi.object().keys({
          authorization: Joi.string().required().description('jwt token')}).unknown(), */    
  {
    method: ['PUT'],
    path: '/user/{id}',
    handler: controller.updateUser,
    config: {
      auth: false,
      description: 'update a user from id',
      notes: 'return a User',
      tags: ['api','user', 'update'],
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
        params: {
          id: Joi.string()
                    .required()
                    .description('user id')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/login',
    handler: controller.login,
    config: {
      auth: false,
      description: 'login a user',
      notes: 'login with a username and password',
      tags: ['api', 'user', 'login'], 
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
          },
          validate: {
            
          }
        }
      }
    }
  }
];