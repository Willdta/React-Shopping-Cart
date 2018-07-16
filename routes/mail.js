const express = require('express')
const sgMail = require('@sendgrid/mail')
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

  sgMail.setApiKey(keys.sendgridApiKey)
  
  const msg = {
    to: email,
    from: 'noreply@reactcart.com',
    subject: 'Your Order',
    html: output,
  }

  sgMail.send(msg)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
})

module.exports = router