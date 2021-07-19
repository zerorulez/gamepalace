const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../modules/mailer')

require('dotenv/config');

const User = require('../models/User')

function generateToken(params) {
    return jwt.sign(params , process.env.JWT_SECRET, {
        expiresIn: 86400
    })
}

module.exports = {
    async signUp(req, res) {
        const { username, password } = req.body

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must contain at least 6 characters' })
        }

        const email = req.body.email.toLowerCase()

        const hasUsername = await User.findOne({ where: { username: username } })
        if (hasUsername) {
            return res.status(400).json({ error: 'Username already exists' })
        }

        const hasEmail = await User.findOne({ where: { email: email } })
        if (hasEmail) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 8)
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
        
        const { password } = req.body
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must contain at least 6 characters' })
        }

        const email = req.body.email.toLowerCase()
        
        if (!email) {
            return res.status(400).json({ error: 'Provide an email' })
        }

        const user = await User.findOne({
            where: { email: email },
            attributes: { include: ['password'] },
        })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password'})
        }

        user.email = undefined
        user.password = undefined
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        res.send({ 
            user, 
            token: generateToken({ id: user.id })
        })
        
    },
    async forgotPassword(req, res) {
        
        const { email } = req.body

        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.update(
            {
                passwordResetToken: token,
                passwordResetExpires: now
            },
            { where: { id: user.id }}
        )

        mailer.sendMail({
            to: email,
            from: 'no-reply@gamepalace.com.br',
            subject: 'Forgot Password',
            text: 'Token: ' + token
        }).then( mail => {
            return res.send()
        }).catch( err => {
            return res.status(400).send({ error: 'Cannot send email, try again' })
        })
        
    },
    async recoverPassword(req, res) {
        
        const { token, password } = req.body
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must contain at least 6 characters' })
        }

        const email = req.body.email.toLowerCase()

        const user = await User.findOne({
            where: { email: email },
            attributes: { include: ['passwordResetToken', 'passwordResetExpires'] },
        })
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

        await user.update({ password: bcrypt.hashSync(password, 8) })

        res.send()
        
    },

}