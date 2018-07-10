const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const keys = require('./config/keys')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sendMail', (req, res) => {
  const { name, email, total } = req.body
  const nameCheck = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const output = `
    <p>Thanks for shopping with us, ${nameCheck}</p>
    <br />
    <p>Your Total is $${total}</p>
    <hr />
    <p>Gabriel Pozo - React Cart Developer / Owner</p>
    <a href="https://reactshoppingcart1.herokuapp.com/">Shop</a>
  `
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: 'beyondutraining@gmail.com', 
      pass: keys.pass
    },
    tls: { rejectUnauthorized: false }
  })

  const mailOptions = {
    from: '"Gabriel" <beyondutraining@gmail.com>',
    to: email,
    subject: 'Your Order',
    html: output
  }

  transporter.sendMail(mailOptions, (error, info) => {
    error ? res.sendStatus(500) : res.sendStatus(200)
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`connected on port ${port}`))