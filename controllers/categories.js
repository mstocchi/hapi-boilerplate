const models = require('../models');
const Category = models.category;


module.exports = {
	
	get:function (request, reply) {
		reply(Category.query().then(categories => {
				return categories;
			})
			.catch(err => {
				reply(err);
			}))
	}

};