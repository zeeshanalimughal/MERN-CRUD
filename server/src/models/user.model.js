const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    age: { type: Number },
    contact: { type: String },
    address: { type: String },
})

module.exports = mongoose.model('User', userSchema)