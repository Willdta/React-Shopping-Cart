const express = require('express')
const nodemailer = require('nodemailer')
const keys = require('../config/keys')
const router = express.Router()

router.post('/sendMail', (req, res) => {
  const {
    name,
    email,
    address,
    city,
    province,
    postalCode,
    total
  } = req.body
  const allCapsPostal = postalCode.toUpperCase()

  const capitalizer = word =>
    word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const output = `
    <p>Thanks for shopping with us, ${capitalizer(name)}.</p>
    <p>Your Total is $${total}</p>
    <hr />
    <h4>Shipping Information:</h4>
    <p>${capitalizer(address)}</p>
    <p>${capitalizer(city)}</p>
    <p>${capitalizer(province)}</p>
    <p>${allCapsPostal}</p>
    <p>Canada</p>
    <hr />
    <p>Gabriel Pozo - React Cart Developer / Owner</p>
    <a href="https://reactshoppingcart1.herokuapp.com/">Shop</a>
  `

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'beyondutraining@gmail.com',
      clientId: keys.clientID,
      clientSecret: keys.clientSecret,
      refreshToken: keys.refreshToken,
      // accessToken: keys.accessToken,
      expires: 1000000000000000000
    }
  })

  const mailOptions = {
    from: '"Gabriel" <beyondutraining@gmail.com>',
    to: email,
    subject: 'Your Order',
    html: output
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    }

    res.sendStatus(200)
  })
})

module.exports = router