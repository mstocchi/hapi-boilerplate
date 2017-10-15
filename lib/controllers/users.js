const models = require('../models');
const User = models.user;

module.exports = {
	get:function (request, reply) {
    reply(User.query().then(users =>{
			return users;
			}).catch(err => {
    		reply(err);
			})
		)},
	
		echo:function (request, reply) {
	  reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}

};