const mongoose = require('mongoose');

//model for Product
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: {type: Number, required: true},
    productImage: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);
