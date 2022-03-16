const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: { type: String, required: [true, 'Give a name for your product'] },
    price: { type: Number, required: [true, 'Give a price for your product'] },
    imageLink: {
        type: String,
        match: [/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?:: (\d +)) ? (?: \/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
            'should be a valid URL']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [10, 'description should have atleast 10 characters']
    },
    category: {
        type: String,
        required: [true, 'Give your product a category']
    },
    status: {
        type: String,
        enum: ['in stock', 'out of stock'],
        default: 'in stock'
    }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);