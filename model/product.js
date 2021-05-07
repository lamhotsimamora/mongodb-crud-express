const mongoose = require('mongoose');

let table = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    stock: Number
})

const t_product = mongoose.model('t_product', table);

module.exports = t_product;