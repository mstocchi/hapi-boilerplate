"use strict";

const Model = require('../orm')

class user extends Model {
  static get tableName() {
    return 'user';
  }
}

module.exports = user;
