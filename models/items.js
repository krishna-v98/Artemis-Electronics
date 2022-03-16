const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    imageLink: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);