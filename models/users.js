const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'First name required'] },
    lastName: { type: String, required: [true, 'Last name required'] },
    email: { type: String, required: [true, 'Email required'], unique: true },
    password: { type: String, required: [true, 'Password required'] },
});

module.exports = mongoose.model('User', userSchema);