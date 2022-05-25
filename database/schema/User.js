const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  location: String,
  phone: String,
  education: String,
  linkedin: String,
  role: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
