const sharp = require('sharp');
const path = require('path');

const Post = require('../models/Post')
const User = require('../models/User')
const Image = require('../models/Image')
const Reply = require('../models/Reply')
// const PrettyEmbed = require('../modules/PrettyEmbed.js')
const IP = require('../modules/IP')
// const sanitizeHtml = require('sanitize-html')

module.exports = {
    async store(req, res) {

        const { description } = req.body
        const files = req.files
        
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { all: true, nested: true }
            ]
        })
        
        if (!post) {
            return res.status(400).json({ error: 'Post not found' })
        }

        const reply = await Reply.create({
            description: description,
            userId: req.userId,
            postId: post.id
        })

        if (!reply) {
            return res.status(400).send({ error: "Error creating post, try again" })
        }
    
        if (files) {
            let folder = await path.resolve(__dirname, "..")

            files.map( file => {
                // coloca o reply id dentro de cada imagem para subir no banco
                file.replyId = reply.id

                // cria a thumbnail
                sharp(file.path).resize(300).toFile(folder + '/images/post/thumbnail_' + file.filename, (err, resizeImage) => {
                    if (err) {
                        return res.status(400).send({ error: "Error converting image"})
                    }
                })
            })
        }

        const images = await Image.bulkCreate(files)

        const newReply = await Post.findOne({
            where: { id: reply.postId },
            include: [
                { all: true, nested: true }
            ]
        })
        
        return res.json(newReply)

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