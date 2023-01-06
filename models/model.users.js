const mongoose = require('mongoose')
const {USER_ROLES} = require('../lib/constants')
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
