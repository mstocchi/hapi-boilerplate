'use strict';

var Hapi = require('hapi');

var path = require('path');
var settings = require('config');

var routes = require('./routes');
var plugins = require('./plugins');

const orm = require('./orm');



var server = new Hapi.Server();

server.connection({port:settings.port, host:settings.host});

// Export the server to be required elsewhere.
module.exports = server;

server.route(routes);

server.start((err)=>{
  if(err){
    throw err;
  }
      console.log(`Server running at: ${server.info.uri}`);
      console.log(orm);

});
