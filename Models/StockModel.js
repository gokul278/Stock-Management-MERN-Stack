const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: true
    },
    product_description: {
        type: String,
        require: true
    },
    product_stocks: {
        type: Number,
        default: 0
    },
    product_price: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const myDB = mongoose.connection.useDb("StockManagement");

module.exports = myDB.model('stocks', StockSchema);