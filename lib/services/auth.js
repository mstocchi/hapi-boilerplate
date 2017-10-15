'use strict'

/**
   * 
   * @param {*} decoded 
   * @param {*} request 
   * @param {*} callback 
   */
  const validateJwtTokenDummy = function (decoded, request, callback) {
    console.log(decoded)
  return callback(null, true)
}

module.exports = {
    validateToken:  validateJwtTokenDummy
}