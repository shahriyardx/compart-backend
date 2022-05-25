const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  short_description: String,
  description: String,
  image: String,
  price: Number,
  min_order: Number,
  quantity: Number,
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
