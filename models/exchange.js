const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    initiator: { type: Schema.Types.ObjectId, ref: 'User' },
    responder: { type: Schema.Types.ObjectId, ref: 'User' },
    initiateItem: { type: Schema.Types.ObjectId, ref: 'Trade' },
    respondItem: { type: Schema.Types.ObjectId, ref: 'Trade' },
    status: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Exchange', exchangeSchema);