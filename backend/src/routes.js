const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const rateLimit = require("express-rate-limit");

const PostController = require('./controllers/Post.js')
const ReplyController = require('./controllers/Reply.js')

const routes = express.Router()

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 1
});

routes.get('/:categorie', PostController.index)
routes.get('/posts/:_id', PostController.get)
routes.post('/posts', apiLimiter, multer(multerConfig).single('file'), PostController.store)

routes.post('/replys', apiLimiter, multer(multerConfig).single('file'), ReplyController.store)

module.exports = routes