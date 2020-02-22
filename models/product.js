const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type: String, required: "name is required"},
    price: {type: Number, required: "price is required"}
});


module.exports = mongoose.model("product", productSchema);
