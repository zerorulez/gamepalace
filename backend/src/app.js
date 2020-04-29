const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes.js')

const app = express()
const server = require('http').Server(app)

mongoose.connect('mongodb+srv://admin:BuY2eKkdoEu4vp0v@cluster0-buojx.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

app.use(express.static('tmp'));
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)