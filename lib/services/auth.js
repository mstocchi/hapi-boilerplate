'use strict'

const bcrypt = require('bcrypt')

const saltRounds = 10

/**
   * 
   * @param {*} decoded 
   * @param {*} request 
   * @param {*} callback 
   */
const validateJwtTokenDummy = function (decoded, request, callback) {
  return callback(null, true)
}

const createSignedToken = function (payload) {
  const signedToken = jwt.sign(payload, require('../config').get('encryption.jwtsignkey'))
  return signedToken
}

/**
 * 
 * @param {*} credential 
 */
const hashCredentials = async function(credential) {
  return bcrypt.hash(credential, saltRounds);
}

module.exports = {
  validateToken: validateJwtTokenDummy,
  getSignedToken: createSignedToken,
  getHash: hashCredentials
}