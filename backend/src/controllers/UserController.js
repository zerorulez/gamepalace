const sharp = require('sharp');
const path = require('path');
const bcrypt = require('bcryptjs');

const User = require('../models/User.js')

module.exports = {
    async get(req, res) {

        const user = await User.findById(req.userId)

        res.send(user)

    },
    async update(req, res) {

        const { password, newPassword } = req.body

        var avatar = undefined
        var avatarMimeType = undefined
        
        if (req.file) {
            avatar = req.file.filename
            avatarMimeType = req.file.mimetype

            let folder = await path.resolve(__dirname, "..")

            sharp(req.file.path).resize(100).toFile(folder + '/images/avatars/thumbnail_' + avatar, (err, resizeImage) => {
                if (err) {
                    return res.status(400).send({ error: "Error converting image"})
                }
            })
        } else {
            // return res.status(400).send({ error: "Error uploading image"})
        }

        var confirmPassword = undefined

        if (password && newPassword) {
            const user = await User.findById( req.userId ).select('+password')
            if (!user) {
                return res.status(400).json({ error: 'User not found' })
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ error: 'Invalid password'})
            }

            confirmPassword = newPassword
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            avatar,
            avatarMimeType,
            password: confirmPassword
        }, { new: true })

        res.send(updatedUser)

    },
    async delete(req, res) {

        const user = await User.findByIdAndDelete(req.userId)

        res.send(user)

    }
}