const mongoose = require('mongoose');
const videoSchema = mongoose.Schema({
    video: {
        type: Buffer
    },
    title: {
        type: String
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Video', videoSchema)