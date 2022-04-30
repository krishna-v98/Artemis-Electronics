const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: [true, 'Name required for product'] },
    price: { type: String, required: [true, 'Price required for product'] },
    imageLink: {
        type: String
    },
    description: {
        type: String,
        minlength: [10, 'Must be atleast 10 characters']
    },
    category: {
        type: String,
        required: [true, 'product category is required']
    },
    status: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);