const jwt = require('jsonwebtoken');

module.exports = {
  validateUserToken: (req, res, next) => {
    if(!req.headers.authorization){
      res.status(400).json('Token not provided')
    }
    const token = req.headers.authorization.split(' ')[1]
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.decoded = decoded._id
      next()
    }
    catch(err){
      res.status(400).json('Invalid Token')
    }
  }
}