const crypto = require("crypto")
const fs = require('fs')
const path = require('path')
const https = require('https')

module.exports = {
    async image(req, res) {
        if (req.file) {
            return res.json({
                success: 1,
                    file: {
                    url: `${process.env.API_IMAGE}${req.file.filename}`
                }
            })
        } else {
            return res.json({
                success: 0
            })
        }
    },
    async imageByURL(req, res) {
        const { url } = req.body
        const extension = url.split('.').pop()
        crypto.randomBytes(16, (err, hash) => {
            let filename = `${hash.toString("hex")}.${extension}`;
            const file = fs.createWriteStream(path.join(__dirname, "..", "images", "posts", filename))
            https.get(url, function(response) {
                response.pipe(file);
                return res.json({
                    success: 1,
                    file: {
                        url: `${process.env.API_IMAGE}${filename}`
                    }
                })
            })
        })
    }
}