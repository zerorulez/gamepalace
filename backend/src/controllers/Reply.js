const Post = require('../models/Post.js')

module.exports = {
    async store(req, res) {
        
        const { _id, description } = req.body
        var filename = null
        
        if (req.file) {
            filename = req.file.filename
        }

        Post.findOne({ _id: _id }).then( post => {
            if (post != null) {

                post.replys.push({
                    description,
                    filename
                })
        
                post.save().then( reply => {

                    return res.json(reply)

                }).catch(err => {

                    return res.json(err)

                })
    
            } else {
    
                return res.json('Post not found')
    
            }
        }).catch( err => {

            return res.json(err)

        });
    }
}