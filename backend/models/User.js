const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: () => new Date().toISOString()
    },
    timestamp: {
        type: String,
        default: () => new Date().toISOString()
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;