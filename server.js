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
  const { name, email, address, city, province, postalCode, total } = req.body
  const allCapsPostal = postalCode.toUpperCase()
 
  const capitalizer = word => {
    return word
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    }
  
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
    // host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // type: 'OAuth2',
      user: 'beyondutraining@gmail.com',
      pass: keys.pass 
      // clientId: keys.clientID,
      // clientSecret: keys.clientSecret,
      // refreshToken: keys.refreshToken,
      // accessToken: keys.accessToken
    },
    tls: {
      rejectUnauthorized: false
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`connected on port ${port}`))