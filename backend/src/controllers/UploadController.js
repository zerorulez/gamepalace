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
    }
}