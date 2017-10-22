'use strict';
require('app-module-path/register');

const settings = require('./lib/config');
const Hapi = require('hapi');
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Good = require('good');
const path = require('path');
const userService = require('lib/services/userService')

const validateJwtToken = function (decoded, request, callback) {
  
  userService.findUserByEmailAndToken(decoded.userid, request.auth.token)
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


const server = new Hapi.Server();

server.connection({
    port: settings.get('host.port'),
    host: settings.get('host.address'),
    routes: {
        cors: {
            origin: ['*'],
            headers: ['Accept', 'Content-Type', 'Authorization'],
            additionalExposedHeaders: ['link', 'content-range'] /* pagination headers */
        }
    }
});

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: {
            info: {
                version: '0.1'
            }
        }
    },
    {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    },
    {
        register: require('./lib/plugins/auth-jwt'),
        options: {
            validationHandler: validateJwtToken,
            jwtencodekey: require('./lib/config').get('encryption.jwtsignkey')
        }
    },
    {
        register: require('lib/plugins/routes')
    }
], err => {
    if (err) {
        return reject(err);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    
    console.log(`Server running at: ${server.info.uri}`);

});

module.exports = server;
