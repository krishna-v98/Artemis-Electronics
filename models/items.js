const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: { type: String, required: [true, 'Name required for product'] },
    price: { type: String, required: [true, 'Price required for product'] },
    imageLink: {
        type: String,
        //regualar expression for url format
        match: [/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'Please enter a valid URL']
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
        type: String,
        //enum to restrict status types
        enum: ['available', 'sold']
    }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);