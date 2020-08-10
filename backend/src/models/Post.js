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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageMimeType: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    replies: [{
        description: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        image: {
            type: String
        },
        imageMimeType: {
            type: String
        },
        ip: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }]
},{
    timestamps: true
})

module.exports = model('Post', PostSchema)