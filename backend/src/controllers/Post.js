const Post = require('../models/Post.js')
const PrettyEmbed = require('../modules/PrettyEmbed.js')
const IP = require('../modules/IP.js')
const sanitizeHtml = require('sanitize-html')

module.exports = {
    async index(req, res) {
        
        const categorie = req.params.categorie

        const posts = await Post.find({ categorie: categorie }).sort({'updatedAt': -1}).limit(20)

        return res.json(posts)
    },

    async get(req, res) {
        
        const _id = req.params._id

        Post.findOne({ _id: _id }).then( post => {

            return res.json(post)

        }).catch( err => {

            return res.json(err)
            
        })
        
    },

    async store(req, res) {

        let ip = IP(req)

        var { title, description, embed, categorie } = req.body
        var filename

        description = sanitizeHtml(description)
        
        if (req.file) {
            filename = req.file.filename
        }
        
        embed = PrettyEmbed(embed);

        if (embed || filename) {
            Post.create({
                title,
                description,
                categorie,
                filename,
                embed,
                ip
            }).then( post => {
    
                return res.json(post)
    
            }).catch( err => {
    
                return res.json({
                    error: 'Title and description are required.'
                })
                
            })
        } else {
            return res.json({
                error: 'File or Embed are required.'
            })
        }
    }
}