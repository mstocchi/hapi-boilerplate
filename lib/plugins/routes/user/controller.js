const models = require('lib/models');
const User = models.user;
const userService = require('lib/services/userService')
const authService = require('lib/services/auth')
const Boom = require('Boom')
const Enjoi = require('enjoi')

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

const update = function (request, reply) {

	userService.update(request.params.id, request.payload)
		.then(userUpdate => {
			return response({}).code(200)
		})
		.catch(err => {
			console.log(err);
			return response(err);
		});
}


/**
 * Authenticate user based on email and password and return an access token
 * @param {*} request 
 * @param {*} reply 
 */
const login = function(request, reply) {
	userService.authenticateUser(request.payload.email, request.payload.password)
	.then(token=>{
		reply({token:token}).code(200);
	})
	.catch(err=>{
		console.log(err);
		reply(Boom.notFound('user not found or bad credentials'));
	});
}

const getUserSchema = function (){
	const jsonSchema =  User.jsonSchema;
	return Enjoi(jsonSchema);
}



module.exports = {
	addUser: insert,
	getUsers: findAll,
	getUser: getUserById,
	updateUser: update,
	getUserSchema: getUserSchema,
	login: login
};