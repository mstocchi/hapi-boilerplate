var models = require('../models');

module.exports = {
	get:function (request, reply) {
    reply(models.category.query().then(categories =>{
			return categories;
		})
		.catch(err => {
    console.log('oh noes');
	}))
	}
};