require('dotenv').config()
require('./database/db').connect()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./src/routes/routes')


app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




mongoose.connection
.once('open', () => console.log('connected to MongoDB!'))
.on('error', err => console.error('connecting to MongoDB ' + err))


app.use('/api', routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
    console.log('listening on port ' + PORT)
})
