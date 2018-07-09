// const app = require('express')()
// const port = process.env.PORT || 5000
// const bodyParser = require('body-parser')
// const nodemailer = require('nodemailer')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.post('/send', (req, res) => {
//   const output = `
//     <p>Thanks for shopping with us</p>
//     <br />
//     <p>Here is your order:</p>
//     <br />
//     <ul>
//       <li>${req.body.order}</li>
//     </ul>
//   `

//   nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: account.user, // generated ethereal user
//         pass: account.pass // generated ethereal password
//       }
//     })

//     // setup email data with unicode symbols
//     let mailOptions = {
//       from: '"React-Cart" <react-cart@no-reply.com>', // sender address
//       to: req.body.email, // list of receivers
//       subject: 'React Cart', // Subject line
//       text: 'Your Order', // plain text body
//       html: output // html body
//     }

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.log(error)
//       }
//       console.log('Message sent: %s', info.messageId)
//       // Preview only available when sending through an Ethereal account
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

//       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     })
//   })
// })

// app.get('/test', (req, res) => {
//   res.send({ message: 'Hey there m8'})
//   console.log('ehyyyyy');
  
// })

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../client/build'))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

// app.listen(port, () => console.log(`connected on port ${port}`))