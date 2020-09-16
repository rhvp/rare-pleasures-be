const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
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
    published: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('product', productSchema);