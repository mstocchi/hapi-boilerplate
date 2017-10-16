const objection = require('objection');
const Model = objection.Model;
const config = require('lib/config')

const Knex = require('knex')({
  client: 'mysql',
  connection: config.get('database.connection')
});

Model.knex(Knex);

module.exports = Model;