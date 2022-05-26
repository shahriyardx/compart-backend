const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product_name: String,
  product_id: String,
  email: String,
  phone: String,
  shipping_address: String,
  due: Number,
  quantity: Number,
  status: String,
  paid: Boolean,
});

OrderSchema.pre("save", function (next) {
  var order = this;
  order.status = "Created";
  order.paid = false;

  next();
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
