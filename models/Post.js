const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    img: {
        type: String,
        required :true
    },
    title: {
        type: String,
        required :true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('posts', postSchema)