const mongoose = require("mongoose");


const Products = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})


const BillingSchema = new mongoose.Schema({
    bill_id: {
        type: Number,
        required: true,
        unique: true
    },
    products: [Products],
    total_billvalue: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const myDB = mongoose.connection.useDb("StockManagement");

module.exports = myDB.model('billings', BillingSchema);