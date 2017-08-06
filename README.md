# Hapi Boilerplate
### *A Hapi boilerplate with Objection.js, * and node-config*

Cool features in this boilerplate:

- It's modular. Define your routes, plugins, models and controllers separately.
- Uses [node-config](https://github.com/lorenwest/node-config). Define all your configuration properties hierarchically and according to your environment.
- Models/ORM through [Objection.js](http://vincit.github.io/objection.js) with common configuration! Supports migrations. 

## Directory structure ##

The structure of the boilerplate and explanation follows:
```bash
hapi-boilerplate
├── app.js                  # Application entry point run with "node app"
├── config
│   ├── default.json        # common config for all environments
│   ├── development.json    # config for development environments
│   ├── production.json     # config for production environments
├── controllers
│   ├── index.js            # file that requires all controllers into a hash
│   └── users.js            # an example controller. use it for inspiration.
├── migrations              # migrations directory with an example migration
│   └── 20141021121205-create-user.js
├── models
│   ├── index.js            
│   └── user.js             # an example model
├── package.json
├── plugins
│   └── index.js            # register plugins. add your custom plugins in this folder as well.
├── README.md
└── routes.js               # define all the routes in this file.
```

##Usage

Just clone the repository:

```bash
$ git clone https://github.com/mstocchi/hapi-boilerplate.git
```
run

```bash
$ npm install
```

and start coding.

To run the application run `node app`.
