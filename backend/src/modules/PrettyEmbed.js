const pretty = function(embed) {
    if (embed != '' && embed) {

        if (embed.includes('youtube')) {
            // let id = embed.split("?v=")[1] //video id
            let regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/gim

            let id = regex.exec(embed)[3]
            
            if (id) {
                embed = "http://www.youtube.com/embed/" + id //www.youtube.com/embed/sGbxmsDFVnE
            } else {
                return res.json({error: 'Invalid Youtube URL!'})
            }

        } else if (embed.includes('twitch')) {
            if (embed.includes('clip')) {
                let id = embed.split("clip/")[1] //channel name
                
                if (id) {
                    embed = "https://clips.twitch.tv/embed?clip=" + id + "&autoplay=false"
                } else {
                    return res.json({error: 'Invalid Twitch Clip URL!'})
                }
                
            } else {
                let id = embed.split(".tv/")[1] //channel name

                if (id) {
                    embed = "https://player.twitch.tv/?channel=" + id + "&autoplay=false" //www.youtube.com/embed/sGbxmsDFVnE
                } else {
                    return res.json({error: 'Invalid Twitch URL!'})
                }
                
            }
        } else if(embed.includes('vimeo')) {
            
            // let id = embed.split("vimeo.com/")[1] //video id
            let regex = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/g
            
            let id = regex.exec(embed)[4]

            if (id) {
                embed = "https://player.vimeo.com/video/" + id //www.youtube.com/embed/sGbxmsDFVnE
            } else {
                return res.json({error: 'Invalid Vimeo URL!'})
            }

        } else {
            return res.json({error: 'Invalid URL!'})
        }

    } else {
        embed = undefined
    }

    return embed
}

module.exports = pretty;