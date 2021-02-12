const express = require('express')
const multer = require('multer')
// const avatarConfig = require('./config/avatar')
const postsConfig = require('./config/posts')
// const rateLimit = require("express-rate-limit")

const authMiddleware = require('./middlewares/auth')

const AuthController = require('./controllers/AuthController.js')
const UserController = require('./controllers/UserController.js')
const PostController = require('./controllers/PostController.js')
const ReplyController = require('./controllers/ReplyController')
const UploadController = require('./controllers/UploadController')
const FetchController = require('./controllers/FetchController')

const routes = express.Router()

// const apiLimiter = rateLimit({
//     windowMs: 2 * 60 * 1000, // 2 minutes
//     max: 1
// });

// const uploadAvatar = multer(avatarConfig).single('file')
const uploadPostImage = multer(postsConfig).single('image')

routes.post('/api/signup', AuthController.signUp)
routes.post('/api/signin', AuthController.signIn)
routes.post('/api/forgot-password', AuthController.forgotPassword)
routes.post('/api/reset-password', AuthController.recoverPassword)

routes.get('/api/profile', authMiddleware, UserController.index)
routes.get('/api/profile/:username', UserController.get)
routes.put('/api/profile', authMiddleware, UserController.update)
routes.delete('/api/profile', authMiddleware, UserController.delete)

routes.get('/api/post', PostController.index)
routes.get('/api/post/:id', PostController.get)
routes.post('/api/post', authMiddleware, PostController.store)

routes.post('/api/reply/:id', authMiddleware, ReplyController.store)
// routes.get('/posts/:_id', PostController.get)
// routes.post('/posts', apiLimiter, multer(multerConfig).single('file'), PostController.store)

// routes.post('/replys', apiLimiter, multer(multerConfig).single('file'), ReplyController.store)

routes.post('/api/image', uploadPostImage, UploadController.image)
routes.post('/api/image-by-url', uploadPostImage, UploadController.imageByURL)

// routes.get('/api/fetch', FetchController.fetch)

module.exports = routes