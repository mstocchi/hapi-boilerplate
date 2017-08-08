'use strict';

const Hapi = require('hapi');
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Good = require('good');
const path = require('path');
const settings = require('config');

const routes = require('./routes');
/* TODO: not really used, check hapi documentation */
const plugins = require('./plugins');

const orm = require('./orm');

const server = new Hapi.Server();

server.connection({
    port:settings.port, 
    host:settings.host,
    routes: {
                cors: {
                    origin: ['*'],
                    headers: ['Accept', 'Content-Type', 'Authorization'],
                    additionalExposedHeaders: ['link','content-range'] /* pagination headers */
                }
      }
  });

server.register([
            Inert,
            Vision,
            {
                register: HapiSwagger,
                options: {
                    info : {
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
              register: require('hapi-auth-jwt2'),
              options: { }
            }  
        ], err => {
            if (err) {
                return reject(err);
            }
});

server.auth.strategy('jwt', 'jwt',
{ 
  key: 'secret',          
  validateFunc: (decoded, request, callback) => {
      if (decoded === decoded) {
        return callback(null, true)
      }
      else {
        return callback(null, false)
      }
  },            
  verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
});


for (var route in routes) {
    let routeObject = routes[route]
    server.route(routeObject);
    //console.log(`-> added route ${routeObject.method} - ${routeObject.path}`);
}

server.start((err)=>{
  if(err){
    throw err;
  }
      console.log(`Server running at: ${server.info.uri}`);

});

// Export the server to be required elsewhere.
module.exports = server;
