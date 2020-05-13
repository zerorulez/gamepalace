const Post = require('../models/Post.js')
const PrettyEmbed = require('../modules/PrettyEmbed.js')
const IP = require('../modules/IP.js')

module.exports = {
    async store(req, res) {

        let ip = IP(req)
        console.log(ip)
        
        var { _id, reply_id, description, embed } = req.body
        var filename
        
        if (req.file) {
            filename = req.file.filename
        }

        embed = PrettyEmbed(embed);

        Post.findOne({ _id: _id }).then( post => {
            if (post != null) {

                if (embed || filename || description) {
                    post.replys.push({
                        reply_id,
                        description,
                        filename,
                        embed,
                        ip,
                        createdAt: new Date()
                    })
            
                    post.save().then( reply => {
    
                        return res.json(reply)
    
                    }).catch(err => {
    
                        return res.json(err)
    
                    })
                } else {

                    return res.json({
                        error: 'Filename or Embed or Description are required.'
                    })

                }
    
            } else {
    
                return res.json({
                    error: 'Post not found.'
                })
    
            }
        }).catch( err => {

            return res.json(err)

        });
    }
}