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
            'schema': Joi.object().keys({
              id: Joi.number(),
              createdAt: Joi.date()
            })
          },
          '400': {
            'description': 'Bad Request'
          },
          '404': {
            'description': 'Not found'
          }
        },
        validate: {
          headers: Joi.object().keys({
            authorization: Joi.string().required().description('jwt token')
          }).unknown(),
          payload: Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(64).required(),
            surname: Joi.string().alphanum().min(3).max(64).required(),
            email: Joi.string().email().required(),
            password: Joi.string().alphanum().min(6).max(128).regex(/^[a-zA-Z0-9]{3,30}$/).required()
          })
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
    description: 'get user from id',
    notes: 'return a User',
    tags: ['api', 'user'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '200': {
            'description': 'Success',
            'schema': Joi.object().keys({
              id: Joi.number(),
              name: Joi.string().alphanum(),
              surname: Joi.string().alphanum(),
              email: Joi.string().email()
            })
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
      }).unknown(),
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
    tags: ['api', 'user', 'update'],
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
      }).unknown(),
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
            'schema': Joi.object().keys({
              token: Joi.string().description('access token that can be used to make requests')
            })
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
      payload: {
        email: Joi.string().email().required().description('user email'),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
      }
    }
  }
}
];