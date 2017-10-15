"use strict";

const Model = require('../core/orm')

class user extends Model {
  static get tableName() {
    return 'user';
  }
}

module.exports = user;
