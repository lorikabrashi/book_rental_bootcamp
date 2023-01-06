const jwt = require('jsonwebtoken');
const { respond } = require('../lib/responder')
const User = require('../models/model.users');
const { USER_ROLES } = require('./constants');

module.exports = {
  validateUserToken: async (req, res, next) => {
    if(!req.headers.authorization){
      return respond(res, 'Token not provided', false)
    }
    const token = req.headers.authorization.split(' ')[1]
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.decoded = decoded._id

      const user = await User.findOne({_id: decoded._id }).exec()
      req.role = user.role
      next()
    }
    catch(err){
     return respond(res, 'Invalid Token', false)
   
    }
  },
  isAdmin: (req, res, next) => {
    if(req.role !== USER_ROLES.ADMIN){
      return respond(res, "You don't have access", false)
    }
    next()
  }
}