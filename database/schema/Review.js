const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: String,
  stars: Number,
  content: String,
  email: String,
});

module.exports =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
