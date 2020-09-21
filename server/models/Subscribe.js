const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribeSchema = mongoose.Schema({

    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    useFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


const Subscribe = mongoose.model('Subscribe', SubscribeSchema);

module.exports = { Subscribe }