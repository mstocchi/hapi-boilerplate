"use strict";

const Model = require('lib/core/orm')

class category extends Model {
  static get tableName() {
    return 'category';
  }
}

module.exports = category;