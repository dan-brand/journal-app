const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);


