const sharp = require('sharp');
const path = require('path');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js')

module.exports = {
    async index(req, res) {

        const user = await User.findOne({
            where: { id: req.userId }
        })
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }
        
        user.password = undefined
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        res.send(user)

    },
    async get(req, res) {

        const username = req.params.username

        const user = await User.findOne({
            where: { username: username }
        })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        user.email = undefined
        user.password = undefined
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        res.send(user)

    },
    async update(req, res) {

        const { about } = req.body

        const user = await User.findOne({
            where: { id: req.userId }
        })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        await user.update({ about: about })

        user.email = undefined
        user.password = undefined
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        res.send(user)

        // var avatar = undefined
        // var avatarMimeType = undefined
        
        // if (req.file) {
        //     avatar = req.file.filename
        //     avatarMimeType = req.file.mimetype

        //     let folder = await path.resolve(__dirname, "..")

        //     sharp(req.file.path).resize(100).toFile(folder + '/images/avatars/thumbnail_' + avatar, (err, resizeImage) => {
        //         if (err) {
        //             return res.status(400).send({ error: "Error converting image"})
        //         }
        //     })
        // }

        // var confirmPassword = undefined

        // if (password && newPassword) {
        //     const user = await User.findById( req.userId ).select('+password')
        //     if (!user) {
        //         return res.status(400).json({ error: 'User not found' })
        //     }

        //     if (!await bcrypt.compare(password, user.password)) {
        //         return res.status(400).send({ error: 'Invalid password'})
        //     }

        //     confirmPassword = newPassword
        // }

        // const updatedUser = await User.findByIdAndUpdate(req.userId, {
        //     about,
        // }, { new: true })

    },
    // async delete(req, res) {
        
    //     const user = await User.findOne({
    //         where: { id: req.userId }
    //     })
        
    //     if (!user) {
    //         return res.status(400).json({ error: 'User not found' })
    //     }

    //     await user.destroy()

    //     res.send(user)

    // }
}