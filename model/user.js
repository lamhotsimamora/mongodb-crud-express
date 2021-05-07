const mongoose = require('mongoose');

let table = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    gender: String
})

const t_user = mongoose.model('t_user', table);

module.exports = t_user;