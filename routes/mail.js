const express = require('express')
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
const funcs = require('../funcs')
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

  const output = `
    <p>Thanks for shopping with us, ${funcs.capitalizer(name)}.</p>
    <p>Your Total is $${total}</p>
    <hr />
    <h4>Shipping Information:</h4>
    <p>${funcs.capitalizer(address)}</p>
    <p>${funcs.capitalizer(city)}</p>
    <p>${funcs.capitalizer(province)}</p>
    <p>${funcs.allCapsPostal(postalCode)}</p>
    <p>Canada</p>
    <hr />
    <p>Gabriel Pozo - React Cart Developer / Owner</p>
  `

  sgMail.setApiKey(keys.sendgridApiKey)
  
  const msg = {
    to: email,
    from: 'noreply@reactcart.com',
    subject: 'Your Order',
    html: output
  }

  sgMail.send(msg)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400))
})

module.exports = router