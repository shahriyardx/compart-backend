const router = require("express").Router();
const Order = require("../database/schema/Order");
const Product = require("../database/schema/Product");

router.get("/", async (req, res) => {
  const data = await Order.find({});

  res.json(data);
});

router.post("/create", async (req, res) => {
  const orderData = req.body;
  const product = await Product.findOne({ _id: orderData.product_id });
  await Product.updateOne(
    { _id: product._id },
    {
      $set: {
        quantity: product.quantity - parseInt(orderData.quantity),
      },
    }
  );
  await Order.create(orderData);
  res.json({ success: true });
});

module.exports = router;
