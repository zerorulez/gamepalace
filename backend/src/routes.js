const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const PostController = require('./controllers/Post.js')
const ReplyController = require('./controllers/Reply.js')

const routes = express.Router()

routes.get('/:categorie', PostController.index)
routes.get('/posts/:_id', PostController.get)
routes.post('/posts', multer(multerConfig).single('file'), PostController.store)

routes.post('/replys', multer(multerConfig).single('file'), ReplyController.store)

module.exports = routes