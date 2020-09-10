const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: Number
    }],
    amount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema);