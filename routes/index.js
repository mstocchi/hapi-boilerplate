const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports.register = function (server, options, next) {


    const routes = fs.readdirSync(__dirname)
        .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== basename);
        })
        .map((file) => {
            return require(path.join(__dirname, file));
        });
    
    for (var route in routes) {
        let routeObject = routes[route]
        server.route(routeObject);
    }
    
    next();
}

module.exports.register.attributes = {
    name: 'routesPlugin',
    version: '0.1'
  }
  