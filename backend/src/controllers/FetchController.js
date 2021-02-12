const ogs = require('open-graph-scraper')

module.exports = {
    async fetch(req, res) {
        const options = { url: req.query.url }

        ogs(options, (error, results, response) => {
            console.log(results)
            if (results.success) {
                return res.json({
                    "success" : 1,
                    "meta": {
                        "title" : results.ogTitle,
                        "description" : results.ogDescription,
                        "image" : {
                            "url" : results.ogImage.url
                        }
                    }
                })
            } else {
                return res.json({
                    success: 0
                })
            }
        });
    },
}