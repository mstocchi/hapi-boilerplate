"use strict";

const Model = require('../core/orm')

class category extends Model {
  static get tableName() {
    return 'category';
  }
}

module.exports = category;