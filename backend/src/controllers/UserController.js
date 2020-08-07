const sharp = require('sharp');
const path = require("path");

const User = require('../models/User.js')

module.exports = {
    async get(req, res) {

        const user = await User.findById(req.userId)

        res.send(user)

    },
    async update(req, res) {

        const { password } = req.body
        
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
            return res.status(400).send({ error: "Error uploading image"})
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            image,
            imageMimeType,
            password
        }, { new: true })

        res.send(user)

    },
    async delete(req, res) {

        const user = await User.findByIdAndDelete(req.userId)

        res.send(user)

    }
}