const Post = require('../models/Post.js')

module.exports = {
    async index(req, res) {

        const posts = await Post.find().sort({'updatedAt': -1}).limit(20);

        return res.json(posts)
    },

    async get(req, res) {
        
        const _id = req.params._id

        Post.findOne({ _id: _id }).then( post => {

            return res.json(post)

        }).catch( err => {

            return res.json(err)
            
        });
        
    },

    async store(req, res) {

        const { title, description } = req.body
        const filename = req.file.filename

        const post = await Post.create({
            title,
            description,
            filename
        })
        
        return res.json(post)
    }
}