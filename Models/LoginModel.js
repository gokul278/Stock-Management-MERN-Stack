const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    username: {
        type: "String",
        require: true
    },
    password: {
        type: "String",
        require: true
    }
})

const myDB = mongoose.connection.useDb("StockManagement");

module.exports = myDB.model('credentials', LoginSchema);