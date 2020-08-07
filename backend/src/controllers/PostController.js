const sharp = require('sharp');
const path = require("path");

const Post = require('../models/Post.js')
const IP = require('../modules/IP.js')
// const PrettyEmbed = require('../modules/PrettyEmbed.js')
// const sanitizeHtml = require('sanitize-html')

module.exports = {
    async index(req, res) {

        const posts = await Post.find().sort({'updatedAt': -1}).populate(['user', 'replies.user'])

        return res.json(posts)

    },
    async get(req, res) {

        const post = await Post.findById(req.params.id).populate('user')

        return res.json(post)

    },
    async store(req, res) {

        const { title, description } = req.body

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
            return res.status(400).send({ error: "Error uploading image"})
        }

        Post.create({
            title,
            description,
            image,
            imageMimeType,
            ip: IP(req),
            user: req.userId
        }).then( post => {
            return res.json(post)
        }).catch( err => {
            return res.status(400).send({ error: "Error creating post, try again" })
        })

    },

    // async get(req, res) {
        
    //     const _id = req.params._id

    //     Post.findOne({ _id: _id }).then( post => {

    //         return res.json(post)

    //     }).catch( err => {

    //         return res.json(err)
            
    //     })
        
    // },

    // async store(req, res) {

    //     let ip = IP(req)

    //     var { title, description, embed, categorie } = req.body
    //     var filename

    //     description = sanitizeHtml(description)
        
    //     if (req.file) {
    //         filename = req.file.filename
    //     }
        
    //     embed = PrettyEmbed(embed);

    //     if (embed || filename) {
    //         Post.create({
    //             title,
    //             description,
    //             categorie,
    //             filename,
    //             embed,
    //             ip
    //         }).then( post => {
    
    //             return res.json(post)
    
    //         }).catch( err => {
    
    //             return res.json({
    //                 error: 'Title and description are required.'
    //             })
                
    //         })
    //     } else {
    //         return res.json({
    //             error: 'File or Embed are required.'
    //         })
    //     }
    // }
}