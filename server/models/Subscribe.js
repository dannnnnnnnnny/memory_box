const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribeSchema = mongoose.Schema({

    userTo: {   // 비디오 게시물 작성자
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {  // 구독자
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


const Subscribe = mongoose.model('Subscribe', SubscribeSchema);

module.exports = { Subscribe }