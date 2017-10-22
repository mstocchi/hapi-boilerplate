"use strict";

const Model = require('lib/core/orm')

class user extends Model {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        token: {type: 'string'},
        password: {type:'string', minlength: 6, maxLength: 512},
        name: {type: 'string'},
        surname: {type: 'string'},
        email: {type: 'string'}
        /** Joi validation's not compatible with json schema date-time */
        /* ,
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',  
          format: 'date-time'
        }*/
      },

      required : ['name', 'surname','password', 'createdAt', 'updatedAt','email']
    }
  }
}

module.exports = user;
