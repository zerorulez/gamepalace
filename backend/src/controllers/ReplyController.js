const sharp = require('sharp');
const path = require("path");

const Post = require('../models/Post.js')
// const PrettyEmbed = require('../modules/PrettyEmbed.js')
const IP = require('../modules/IP.js')
// const sanitizeHtml = require('sanitize-html')

module.exports = {
    async store(req, res) {

        const { description } = req.body

        if (req.file) {
            image = req.file.filename
            imageMimeType = req.file.mimetype

            let folder = await path.resolve(__dirname, "..")

            sharp(req.file.path).resize(350).toFile(folder + '/images/posts/thumbnail_' + image, (err, resizeImage) => {
                if (err) {
                    return res.status(400).send({ error: "Error converting image"})
                }
            })
        } else {
            image = undefined
            imageMimeType = undefined
        }

        Post.findById(req.params.post).populate(['user', 'replies.user']).then( post => {
            post.replies.push({
                description,
                image,
                imageMimeType,
                ip: IP(req),
                user: req.userId
            })

            post.save().then( post => {
                Post.findById(req.params.post).populate(['user', 'replies.user']).then( post => {
                    res.json(post)
                })
            }).catch(err => {
                return res.status(400).send({ error: "Error creating reply, try again"})
            })
        }).catch( err => {
            console.log(err)
            return res.status(400).send({ error: "Post not found, try again" })
        })

    }

    // async store(req, res) {

    //     let ip = IP(req)
        
    //     var { _id, reply_id, description, embed } = req.body
    //     var filename
        
    //     description = sanitizeHtml(description)
        
    //     if (req.file) {
    //         filename = req.file.filename
    //     }

    //     embed = PrettyEmbed(embed);

    //     Post.findOne({ _id: _id }).then( post => {
    //         if (post != null) {

    //             if (embed || filename || description) {
    //                 post.replys.push({
    //                     reply_id,
    //                     description,
    //                     filename,
    //                     embed,
    //                     ip,
    //                     createdAt: new Date()
    //                 })
            
    //                 post.save().then( reply => {
    
    //                     return res.json(reply)
    
    //                 }).catch(err => {
    
    //                     return res.json(err)
    
    //                 })
    //             } else {

    //                 return res.json({
    //                     error: 'Filename or Embed or Description are required.'
    //                 })

    //             }
    
    //         } else {
    
    //             return res.json({
    //                 error: 'Post not found.'
    //             })
    
    //         }
    //     }).catch( err => {

    //         return res.json(err)

    //     });
    // }
}