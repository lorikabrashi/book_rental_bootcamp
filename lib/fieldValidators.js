const { check, validationResult } = require('express-validator')

const User = require('../models/model.users')

module.exports = {
  validate: {
    register: [
      check('email', 'email is not valid').isEmail(),
      check('email', 'email field must not be empty').notEmpty(),
      check('email').custom(async (value) => {
        const user = await User.findOne({ email: value }).exec()
        if (user) {
          return Promise.reject('E-mail already in use')
        }
      }),
      check('password', 'password must have minimum 6 characters').isLength({ min: 6 }),
      check('password', 'password must not be empty').notEmpty(),
    ],
    login: [
      check('email', 'email is not valid').isEmail(),
      check('email', 'email field must not be empty').notEmpty(),
      check('password', 'password must not be empty').notEmpty(),
    ]
  },
  validateResult: (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      next()
    }
  },
}
