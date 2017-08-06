const objection = require('objection');
const Model = objection.Model;
const models = require('./models');

const Knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'admin',
    password : 'password',
    database : 'TaskDO',
    charset  : 'utf8'
  }
});

Model.knex(Knex);

module.exports = Model;