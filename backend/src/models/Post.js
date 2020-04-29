const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    replys: [
        {
            description: {
                type: String,
                required: true
            },
            filename: {
                type: String
            },
        }
    ]
},{
    timestamps: true
})

module.exports = model('Post', PostSchema)