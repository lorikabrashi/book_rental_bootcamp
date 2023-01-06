const express = require('express')
const router = express.Router()
const userController = require('../controllers/controller.users')
const fieldValidators = require('../lib/fieldValidators')
const { respond } = require('../lib/responder')

router.post('/register', fieldValidators.validate.register, fieldValidators.validateResult, async (req, res) => {
  try {
    const user = await userController.register(req.body)
    return respond(res, user)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/login', fieldValidators.validate.login, fieldValidators.validateResult, async (req, res) => {
  try {
    const user = await userController.login(req.body)
    return respond(res, user)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.get('/verify-account', async (req, res) => {
  try {
    const response = await userController.verifyAccount(req.query.token)
    return respond(res, response)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/request-password-reset', fieldValidators.validate.passwordResetEmail, fieldValidators.validateResult, async (req, res) => {
  try {
    const response = await userController.requestResetPassword(req.body)
    return respond(res, response)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/reset-password', fieldValidators.validate.resetPassword, fieldValidators.validateResult, async (req, res) => {
  try{
    const response = await userController.resetPassword(req.body)
    return respond(res, response)
  }
  catch(err){
    return respond(res, err.message, false)
  }

}) 
module.exports = router
