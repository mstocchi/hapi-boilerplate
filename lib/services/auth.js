'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const saltRounds = 10


const createSignedToken = function (payload) {
  const signedToken = jwt.sign(payload, require('lib/config').get('encryption.jwtsignkey'))
  return signedToken;
}

/**
 * 
 * @param {*} credential 
 */
const hashCredentials = async function(credential) {
  return bcrypt.hash(credential, saltRounds);
}

/**
 * 
 * @param {*} value 
 * @param {*} hash 
 */
const verifyHash = async function(value, hash) {
  return bcrypt.compare(value, hash);
}


module.exports = {
  getSignedToken: createSignedToken,
  getHash: hashCredentials,
  verifyHash: verifyHash
}
