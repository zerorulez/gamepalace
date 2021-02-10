const express = require('express')
// const multer = require('multer')
// const avatarConfig = require('./config/avatar')
// const postsConfig = require('./config/posts')
// const rateLimit = require("express-rate-limit")

const authMiddleware = require('./middlewares/auth')

const AuthController = require('./controllers/AuthController.js')
const UserController = require('./controllers/UserController.js')
const PostController = require('./controllers/PostController.js')
const ReplyController = require('./controllers/ReplyController')

const routes = express.Router()

// const apiLimiter = rateLimit({
//     windowMs: 2 * 60 * 1000, // 2 minutes
//     max: 1
// });

// const uploadAvatar = multer(avatarConfig).single('file')
// const uploadPostImage = multer(postsConfig).single('file')

routes.post('/signup', AuthController.signUp)
routes.post('/signin', AuthController.signIn)
routes.post('/forgot-password', AuthController.forgotPassword)
routes.post('/reset-password', AuthController.recoverPassword)

routes.get('/profile', authMiddleware, UserController.index)
routes.get('/profile/:username', UserController.get)
routes.put('/profile', authMiddleware, UserController.update)
routes.delete('/profile', authMiddleware, UserController.delete)

routes.get('/post', PostController.index)
routes.get('/post/:id', PostController.get)
routes.post('/post', authMiddleware, PostController.store)

routes.post('/reply/:id', authMiddleware, ReplyController.store)
// routes.get('/posts/:_id', PostController.get)
// routes.post('/posts', apiLimiter, multer(multerConfig).single('file'), PostController.store)

// routes.post('/replys', apiLimiter, multer(multerConfig).single('file'), ReplyController.store)

module.exports = routes