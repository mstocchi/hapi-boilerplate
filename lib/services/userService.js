'use strict'

const models = require('../models');
const User = models.user;

/**
 * Return an array of user objects
 */
const findAll = async function() {	
	return User.query();
};

/**
 * 
 * @param {*} id 
 */
const findById = async function(id) {
	return User.query().where('id', '=', id);
}

const findByAttr = async function(attribute, value) {
	return User.query().where(attribute, '=', value);
}



/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const insert = function (request, response) {
	const payload = request.payload
	payload.createdAt = new Date();
	payload.updatedAt = new Date();
	User.query().insert(payload)
  .then(res => {
		result = {
			id: res.id,
			createdAt: res.createdAt
		}
		return response(result).code(201);
  })
  .catch(err => {
		console.log(err);
		return response(err);
  });
}

const update = async function (id, user) {
	user.updatedAt = new Date();
	return User.query().patch(user)
  		.where('id', '=', id);
}

module.exports = {
	addUser: insert,
	findAll: findAll,
	updateUser: update,
	getUserById: findById,
	getUserByAttribute: findByAttr,
	user: User
};