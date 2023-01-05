const User = require('../models/model.users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { sendVerificationEmail, sendPasswordResetEmail } = require('../lib/emails')

module.exports = {
  register: async (body) => {
    const { email, firstName, lastName, password } = body

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT))

    const user = await User.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashPassword,
    })

    sendVerificationEmail(user)

    delete user._doc.password
    return user
  },

  login: async (body) => {
    const { email, password } = body
    const user = await User.findOne({ email }).exec()
    if (!user) {
      throw Error('User does not exist')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Incorrect password')
    }

    if (!user.verified) {
      throw Error('Account not verified!')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    return token
  },
  getMe: async (_id) => {
    const user = await User.findOne({ _id }).exec()
    return user
  },

  verifyAccount: async (token) => {
    if (!token) {
      throw Error('Token not provided!')
    }
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET)
    const user = await User.findOne({ _id: decoded }).exec()
    if (!user) {
      throw Error('User does not exist!')
    }
    await User.findByIdAndUpdate(user._id, { verified: true }).exec()
    return true
  },
  requestResetPassword: async (body) => {
    const { email } = body
    const user = await User.findOne({ email }).exec()
    if (!user) {
      throw Error('User does not exist!')
    }
    sendPasswordResetEmail(user)
    return true
  },
  resetPassword: async (body) => {
    const { token, password } = body

    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET)
    const user = await User.findOne({ _id: decoded }).exec()
    if (!user) {
      throw Error('User does not exist!')
    }
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT))
    await User.findByIdAndUpdate(user._id, { password: hashPassword }).exec()
    return true
  },
}
