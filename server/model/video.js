const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    video: {
        type: String
    },
    title: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Video', videoSchema)