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
const login = function (request, response) {

	return userService.findUserByCredentials(request.payload.email, request.payload.password)
		.then(user => {
			if (!user) {
				return Promise.reject({
					msg: `User "${request.payload.email}" not found`,
					code: 404
				  })
			} else {
				return userService.generateUserToken(user)
			}
		})
		.then(token => {
			response({ token: token }).code(200);
		})

		.catch(err => {
			console.log(err);
			response(err.msg).code(err.code);
		});
}

const getUserByAttribute = function (request, response) {

	userService.findOneByAttr(request.params.attr, request.query.value)
		.then(res => {
			if (!res)
				response().code(404)
			else
				response(res).code(200);
		})
		.catch(err => {
			console.log(err)
			response().code(500)
		})
}

module.exports = {
	addUser: insert,
	getUsers: findAll,
	getUser: getUserById,
	updateUser: update,
	userLogin: login,
	getUserByAttribute: getUserByAttribute
};