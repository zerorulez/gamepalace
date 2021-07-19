const express = require('express')
const cors = require('cors')
const path = require('path')

require('dotenv/config');

require('./database.js')

const routes = require('./routes.js')

const app = express()
const server = require('https').Server(app)
var dir = path.join(__dirname, 'images');
app.use('/images', express.static(dir))

app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)