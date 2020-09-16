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
    },
    status: {
        type: String,
        enum: ['processing', 'completed'],
        default: 'processing'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema);