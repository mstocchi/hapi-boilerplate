var models = require('../models');

module.exports = {
	get:function (request, reply) {
    reply(models.user.query().then(users =>{
			return users;
	}).catch(err => {
    console.log('oh noes');
  }))},
	salute:function (request, reply) {
	  reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
};