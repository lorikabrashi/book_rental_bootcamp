const User = require('../models/model.users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
    delete user._doc.password
    return user
  },

  login: async (body) => {
    const { email, password } = body
    const user = await User.findOne({ email }).exec()
    if(!user){
      throw Error('User does not exist')
    }
    if(!bcrypt.compareSync(password, user.password)){
      throw Error('Incorrect password')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return token
  },
  getMe: async (_id) => {
    const user = await User.findOne({_id}).exec()
    return user
  }
}
