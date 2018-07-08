const app = require('express')()
const nodemailer = require('nodemailer')

const port = 5000
app.listen(port, () => console.log(`connected on port ${port}`))