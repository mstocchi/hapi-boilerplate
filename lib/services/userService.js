'use strict'

const models = require('../models');
const User = models.user;

const authService = require('lib/services/auth');

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
	return User.query().findOne(attribute, '=', value);
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

/**
 * Update a single object by ID
 * @param {*} id 
 * @param {*} user 
 */
const update = async function (id, user) {
	user.updatedAt = new Date();
	return User.query().patchAndFetchById(id, user);
	
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
	const updatedUser = await update(user.id, {token: newToken, updatedAt : new Date()});
	if(updatedUser)
		return updatedUser.token;
}

const authenticateUser = async function(email, password){
	const user = await findOneByAttr('email',email);
	const authenticated = await authService.verifyHash(password, user.password);
	if(authenticated)
		return generateUserToken(user);
	else 
		throw Error(email + ' logged with wrong credentials');
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
	authenticateUser: authenticateUser,
	user: User
};