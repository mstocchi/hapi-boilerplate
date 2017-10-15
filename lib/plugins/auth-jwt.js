'use strict'

const hapijwt = require('hapi-auth-jwt2')

exports.register = (server, options, next) => {
  
  server.register(hapijwt, registerAuth)
  
  function registerAuth (err) {
    if (err) { return next(err) }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT || options.jwtencodekey,
      validateFunc: options.validationHandler,
      verifyOptions: {algorithms: [ 'HS256' ]}
    })

    server.auth.default('jwt')

    return next()
  }
}

exports.register.attributes = {
  name: 'auth-jwt',
  version: '0.0.1'
}
