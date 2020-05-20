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

app.use(express.static('tmp'))
app.set('trust proxy', true)
app.use(cors(
    {
        origin: 'http://gamepalace.tk',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
))
app.use(express.json())
app.use(routes)

server.listen(3333)