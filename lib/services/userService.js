'use strict'

const models = require('../models');
const User = models.user;
const Boom = require('Boom')

const authService = require('lib/services/auth')

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
 * @param {*} attribute 
 * @param {*} value 
 */
const findOneByAttr = async function(attribute, value) {
	return User.query().where(attribute, '=', value)
	.then(res=>{
		if(!res){
			return Promise.reject();
		}
		if(res.length>1){
			throw new Error('more than one elements for User.' +  attribute + ' = ' + value);
		}
		return res[0];
	});
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

const findUserByCredentials = async function(email, password){

	let user;
	let valid;
	
	user = await findOneByAttr('email',email);
	if(user){
		valid = await authService.verifyHash(password, user.password);
		if(valid)
			return user
	}
}

const generateUserToken = async function(user){
	const newToken = authService.getSignedToken({userid: user.email});
	const updated = await update(user.id, {token: newToken, updatedAt : new Date()});
	if(updated)
		return newToken;
}



module.exports = {
	addUser: insert,
	findAll: findAll,
	updateUser: update,
	getUserById: findById,
	getUserByAttribute: findByAttr,
	findOneByAttr:findOneByAttr,
	generateUserToken: generateUserToken,
	findUserByCredentials:findUserByCredentials,
	user: User
};