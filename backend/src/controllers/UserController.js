const sharp = require('sharp');
const path = require('path');
const bcrypt = require('bcryptjs');

const User = require('../models/User')

module.exports = {
    async index(req, res) {

        const user = await User.findOne({
            attributes: {include: ['email']},
            where: { id: req.userId }
        })
        
        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

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

        res.send(user)

    },
    async update(req, res) {

        const { about } = req.body
        const file = req.file

        const user = await User.findOne({
            attributes: {include: ['email']},
            where: { id: req.userId }
        })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        if (file) {
            var filename = req.file.filename
            var mimeType = req.file.mimetype

            let folder = await path.resolve(__dirname, "..")

            sharp(req.file.path).resize(300).toFile(folder + '/images/user/thumbnail_' + filename, (err, resizeImage) => {
                if (err) {
                    return res.status(400).send({ error: "Error converting image"})
                }
            })
        }

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

        await user.update({ 
            about: about,
            filename: filename,
            mimeType: mimeType,
        })

        res.send(user)
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