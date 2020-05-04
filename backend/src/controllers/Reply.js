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
                
                if (id) {
                    embed = "http://www.youtube.com/embed/" + id //www.youtube.com/embed/sGbxmsDFVnE
                } else {
                    return res.json({error: 'Invalid embed!'})
                }

            } else if (embed.includes('twitch')) {
                if (embed.includes('clip')) {
                    let id = embed.split("clip/")[1] //channel name
                    
                    if (id) {
                        embed = "https://clips.twitch.tv/embed?clip=" + id + "&autoplay=false"
                    } else {
                        return res.json({error: 'Invalid embed!'})
                    }
                    
                } else {
                    let id = embed.split(".tv/")[1] //channel name

                    if (id) {
                        embed = "https://player.twitch.tv/?channel=" + id + "&autoplay=false" //www.youtube.com/embed/sGbxmsDFVnE
                    } else {
                        return res.json({error: 'Invalid embed!'})
                    }
                    
                }
            } else if(embed.includes('vimeo')) {
                
                let id = embed.split("vimeo.com/")[1] //video id
                
                if (id) {
                    embed = "https://player.vimeo.com/video/" + id //www.youtube.com/embed/sGbxmsDFVnE
                } else {
                    return res.json({error: 'Invalid embed!'})
                }

            } else {
                return res.json({error: 'Invalid embed!'})
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