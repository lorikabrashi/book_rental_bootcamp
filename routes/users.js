const express = require('express')
const { validateUserToken } = require('../lib/tokenValidators')
const router = express.Router()
const userController = require('../controllers/controller.users')
const { respond } = require('../lib/responder')

router.get('/me', validateUserToken, async (req, res) => {
  try {
    const result = await userController.getMe(req.decoded)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

module.exports = router
