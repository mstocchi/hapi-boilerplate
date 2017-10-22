'use strict'

const models = require('../models');
const User = models.user;
const authService = require('./auth');


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

const findUserByEmailAndToken = async function(email, token){
		return User.query().findOne({email: email, token: token});
}

/**
 * User token validation
 * @param {*} decoded 
 * @param {*} request 
 * @param {*} callback 
 */
const validateJwtToken = function (decoded, request, callback) {
  
  findUserByEmailAndToken(decoded.userid, request.auth.token)
  .then(res=>{
    if(res.email === decoded.userid){
      return callback(null, true)
    }
  })
  .catch(err => {
    console.log(err);
    return callback(null, false)
  })
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
	authenticateUser: authenticateUser,
	findUserByEmailAndToken: findUserByEmailAndToken,
	validateJwtToken: validateJwtToken,
	user: User
};