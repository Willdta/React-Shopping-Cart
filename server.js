const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mail = require('./routes/mail')
const port = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Route
app.use('/', mail)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`connected on port ${port}`))