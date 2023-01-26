const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

module.exports = {
  sendVerificationEmail: async (user) => {
    const transporter = getTransporter()

    const emailText = `
      Welcome to Booking Rental!
      To verify your account please click on the button/link bellow: \n
    `

    const token = jwt.sign({ _id: user._id }, process.env.JWT_VERIFICATION_SECRET)
    const link = `http://localhost:3001/verify-account?token=${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Account verification',
      text: emailText + link,
      html: emailText + ` <a href=${link}>Verify Account</a>`,
    })
  },
  sendPasswordResetEmail: async (user) => {
    const transporter = getTransporter()
    const emailText = `
      You requested to reset your password!

      Please click on the link below:

    `
    const token = jwt.sign({ _id: user._id }, process.env.JWT_VERIFICATION_SECRET)
    const link = `http://localhost:3001/reset-password?token=${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Reset Password Request',
      text: emailText + link,
      html: emailText + ` <a href=${link}>Reset Password</a>`,
    })
  }
}
