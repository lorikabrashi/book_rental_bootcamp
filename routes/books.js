const express = require('express')
const router = express.Router()
const { validateUserToken, isAdmin } = require('../lib/tokenValidators')
const { respond } = require('../lib/responder')

const booksController = require('../controllers/controller.books')
const fieldValidators = require('../lib/fieldValidators')
router.get('/', (req, res) => {
  return respond(res, 'ok')
})

router.post('/', validateUserToken, isAdmin, fieldValidators.validate.addBook, fieldValidators.validateResult, async (req, res) => {
  try {
    const result = await booksController.addBook(req.body)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

module.exports = router
