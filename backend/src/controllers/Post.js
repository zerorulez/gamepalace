const Post = require('../models/Post.js')
const PrettyEmbed = require('../modules/PrettyEmbed.js')
const IP = require('../modules/IP.js')

module.exports = {
    async index(req, res) {

        const posts = await Post.find().sort({'updatedAt': -1}).limit(20)

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
        console.log(ip)

        var { title, description, embed } = req.body
        var filename
        
        if (req.file) {
            filename = req.file.filename
        }
        
        embed = PrettyEmbed(embed);

        if (embed || filename) {
            Post.create({
                title,
                description,
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