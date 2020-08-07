const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../modules/mailer')

require('dotenv/config');

const User = require('../models/User.js')

function generateToken(params) {
    return jwt.sign(params , process.env.JWT_SECRET, {
        expiresIn: 86400
    })
}

module.exports = {
    async signUp(req, res) {
        
        const { username, email, password } = req.body

        const hasUsername = await User.findOne({ username: username })
        if (hasUsername) {
            return res.status(400).json({ error: 'Username already exists' })
        }

        const hasEmail = await User.findOne({ email: email })
        if (hasEmail) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        User.create({
            username,
            email,
            password
        }).then( user => {
            user.password = undefined
            return res.json({
                user, 
                token: generateToken({ id: user.id })
            })
        }).catch( err => {
            return res.status(400).json({ error: 'Something went wrong, try again' })
        })

    },
    async signIn(req, res) {
        
        const { username, password } = req.body

        const user = await User.findOne({ username: username }).select('+password')
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password'})
        }

        user.password = undefined

        res.send({ 
            user, 
            token: generateToken({ id: user.id })
        })
        
    },
    async forgotPassword(req, res) {
        
        const { email } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id,
        {
            passwordResetToken: token,
            passwordResetExpires: now
        })

        mailer.sendMail({
            to: email,
            from: 'zero@bbl.gg',
            subject: 'Message',
            text: token
        }).then( mail => {
            return res.send()
        }).catch( err => {
            return res.status(400).send({ error: 'Cannot send email, try again' })
        })
        
    },
    async recoverPassword(req, res) {
        
        const { email, token, password } = req.body

        const user = await User.findOne({ email: email }).select('+passwordResetToken passwordResetExpires')
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        if (token !== user.passwordResetToken) {
            return res.status(400).json({ error: 'Invalid token' })
        }

        const now = new Date()
        if (now > user.passwordResetExpires) {
            return res.status(400).json({ error: 'Token expired, generate a new one' })
        }

        user.password = password

        await user.save()

        res.send()
        
    },

}