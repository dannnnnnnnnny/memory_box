const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = mongoose.Schema({
    
    writer: {
        type: Schema.Types.ObjectId,    // Id값을 넣으면
        ref: 'User'                     // 그 유저의 모든 정보를 긁어옴
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String,
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }



}, { timestamps: true })


const Video = mongoose.model('Video', userSchema);

module.exports = { Video }