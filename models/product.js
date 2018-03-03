const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);