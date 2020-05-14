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
    categorie: {
        type: String,
        required: true
    },
    filename: {
        type: String
    },
    embed: {
        type: String
    },
    ip: {
        type: String
    },
    replys: [
        {
            reply_id: {
                type: Schema.Types.ObjectId
            },
            description: {
                type: String,
            },
            filename: {
                type: String
            },
            embed: {
                type: String
            },
            ip: {
                type: String
            },
            createdAt: {
                type: Date
            },
        }
    ]
},{
    timestamps: true
})

module.exports = model('Post', PostSchema)