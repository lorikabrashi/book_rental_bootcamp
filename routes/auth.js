const express = require('express')
const router = express.Router()
const userController = require('../controllers/controller.users')
const fieldValidators = require('../lib/fieldValidators')

router.post('/register', fieldValidators.validate.register, fieldValidators.validateResult, async (req, res) => {
  try {
    const user = await userController.register(req.body)
    res.json(user)
  } catch (err) {
    res.status(400).json(err.message)
  }
})

router.post('/login', fieldValidators.validate.login, fieldValidators.validateResult, async (req, res) => {
  try{
   const user = await userController.login(req.body)
    res.json(user)
  }
  catch(err){
    res.status(400).json(err.message)
  }
})

module.exports = router
