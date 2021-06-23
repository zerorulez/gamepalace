const sharp = require('sharp');
const path = require('path');

const Post = require('../models/Post')
const Image = require('../models/Image')
const User = require('../models/User')
const Reply = require('../models/Reply')
const IP = require('../modules/IP')
// const PrettyEmbed = require('../modules/PrettyEmbed.js')
// const sanitizeHtml = require('sanitize-html')

module.exports = {
    async index(req, res) {

        const posts = await Post.findAll({
            include: [
                { all: true, nested: true }
            ],
            order: [
                ['updatedAt', 'DESC'],
                ['id', 'DESC']
            ]
        })

        return res.json(posts)

    },
    async get(req, res) {

        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { all: true, nested: true }
            ]
        })

        if (!post) {
            return res.status(400).json({ error: 'Post not found' })
        }

        // post.userId = undefined

        return res.json(post)

    },
    async store(req, res) {

        const { title, description } = req.body
        const files = req.files

        const post = await Post.create({
            title: title,
            description: description,
            userId: req.userId
        })

        if (!post) {
            return res.status(400).send({ error: "Error creating post, try again" })
        }

        files.map( file => {
            file.postId = post.id
        })

        const images = await Image.bulkCreate(files)

        const newPost = await Post.findOne({
            where: { id: post.id },
            include: [
                { all: true, nested: true }
            ]
        })

        return res.json(newPost)
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