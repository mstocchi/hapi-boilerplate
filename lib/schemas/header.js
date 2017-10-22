var Joi = require('joi')


const headerAuthorizationSchema = Joi.object().keys({
  authorization: Joi.string().required().description('jwt token')
}).unknown();



module.exports = {
  Authorization: headerAuthorizationSchema
}