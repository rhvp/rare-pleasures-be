const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number
    }
}, {
    timestamps: true
})
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('product', productSchema);