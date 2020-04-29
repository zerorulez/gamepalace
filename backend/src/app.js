const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes.js')

require('dotenv/config');

const app = express()
const server = require('http').Server(app)

mongoose.connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

app.use(express.static('tmp'));
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)