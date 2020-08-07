const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    avatarMimeType: {
        type: String
    },
    password: {
        type: String,
        required: true,        
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
},
{
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    
    next()
})

UserSchema.pre('findOneAndUpdate', async function(next) {
    if (this.getUpdate().password) {
        const hash = await bcrypt.hash(this.getUpdate().password, 10)
        this.getUpdate().password = hash
    } else {
        delete this.getUpdate().password
    }

    if (!this.getUpdate().avatar) {
        delete this.getUpdate().avatar
        delete this.getUpdate().avatarMimeType
    }
    
    next()
})

module.exports = model('User', UserSchema)