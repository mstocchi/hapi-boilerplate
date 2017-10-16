const models = require('lib/models');
const User = models.user;
const userService = require('lib/services/userService')
const authService = require('lib/services/auth')

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const findAll = function (request, response) {
	response(userService.findAll().then(users => {
		return users;
	}).catch(err => {
		response(err);
	})
	)
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getUserById = function (request, response) {
	userService.getUserById(request.params.id)
	.then(user => {
		response(user).code(200);
	})
	.catch(err => {
		console.log(err);
		response(err);
	})
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

	authService.getHash(payload.password)
	.then(hash => {
		payload.password = hash;
		return User.query().insert(payload);
	})
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

const update = function (request, response) {
	
	userService.update(request.params.id, request.payload)
	.then(res => {
		return response({}).code(200)
	})
  .catch(err => {
		return response(err);
  });
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
const login = function (request, response){
	let newToken
	userService.getUserByAttribute('email', request.payload.email)
	.then(user => {
		if(user.length>0){
			
			return authService.verifyHash(request.payload.password, user.password);
		}
		else {
			response().code(404);
		}
	})
	.then(res => {
		newToken = auth.getSignedToken({userid: user.email});
		return userService.updateUser(user.id, {token: newToken, updatedAt : new Date()});
	})
	.then(res => {
		response({token: newToken}).code(200);
	})
	.catch(err =>{
		console.log(err);
		response(err);
	});
}

module.exports = {
	addUser: insert,
	getUsers: findAll,
	getUser: getUserById,
	updateUser: update,
	userLogin: login
};