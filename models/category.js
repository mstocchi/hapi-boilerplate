"use strict";

const Model = require('../orm')

class category extends Model {
  static get tableName() {
    return 'category';
  }
}

module.exports = category;