const express = require('express')
const router = express.Router()
const { version, name } = require('../package.json')

router.get('/', function (req, res, next) {
  res.json({
    name,
    version,
  })
})

router.get('/test', async (req, res) => {
  res.json('TEST')
})

module.exports = router
