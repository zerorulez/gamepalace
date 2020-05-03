const Post = require('../models/Post.js')

module.exports = {
    async store(req, res) {
        
        var { _id, description, embed } = req.body
        var filename = null
        
        if (req.file) {
            filename = req.file.filename
        }

        if (embed != '' && embed != 'undefined') {
            if (embed.includes('youtube')) {
                let id = embed.split("?v=")[1] //video id
                embed = "http://www.youtube.com/embed/" + id //www.youtube.com/embed/sGbxmsDFVnE
            }
    
            if (embed.includes('twitch')) {
                if (embed.includes('clip')) {
                    let id = embed.split("clip/")[1] //channel name
                    embed = "https://clips.twitch.tv/embed?clip=" + id + "&autoplay=false"
                } else {
                    let id = embed.split(".tv/")[1] //channel name
                    embed = "https://player.twitch.tv/?channel=" + id + "&autoplay=false" //www.youtube.com/embed/sGbxmsDFVnE
                }
            }
        } else {
            embed = null
        }

        Post.findOne({ _id: _id }).then( post => {
            if (post != null) {

                post.replys.push({
                    description,
                    filename,
                    embed,
                    createdAt: new Date()
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