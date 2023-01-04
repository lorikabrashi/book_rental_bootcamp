const express = require('express');
const { validateUserToken } = require('../lib/tokenValidators');
const router = express.Router();
const userController = require('../controllers/controller.users')


router.get('/me', validateUserToken, async (req, res) => {
  
  try{
   const result = await userController.getMe(req.decoded)
    return res.json(result)
  }
  catch(err){
    return res.status(400).json(err.message)
  }
  
})

module.exports = router;
