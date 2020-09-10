const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your lastname']
    },
    business_name: {
        type: String,
        required: [true, 'Please enter your business name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Please enter your phone number']
    },
    bank: {
        type: String
    },
    nuban: {
        type: String
    },
    address: {
        type: String,
        unique: true,
        required: [true, 'Please enter your address']
    },
    delivery: {
        zone_1: Number,
        zone_2: Number,
        zone_3: Number,
        zone_4: Number
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema);