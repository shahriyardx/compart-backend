const router = require("express").Router();
const Order = require("../database/schema/Order");
const Product = require("../database/schema/Product");
const verifyAdmin = require("../utils/verifyAdmin");

router.get("/", async (req, res) => {
  const data = await Order.find({}).sort({ createdAt: -1 });

  res.json(data);
});

router.get("/my", async (req, res) => {
  const email = req.user.email;
  const data = await Order.find({ email }).sort({ createdAt: -1 });

  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Order.findOne({ _id: id });

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

router.put("/update", async (req, res) => {
  const { order_id, ...newData } = req.body;
  await Order.updateOne(
    { _id: order_id },
    {
      $set: newData,
    }
  );
  res.json({ success: true });
});

router.delete("/delete/:orderId", async (req, res) => {
  const { orderId } = req.params;
  await Order.deleteOne({ _id: orderId });
  res.json({ success: true });
});

module.exports = router;
