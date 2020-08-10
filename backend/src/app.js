const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes.js')

require('dotenv/config');

const app = express()
const server = require('http').Server(app)

mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})


var dir = path.join(__dirname, 'images');

app.use('/images', express.static(dir))
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)