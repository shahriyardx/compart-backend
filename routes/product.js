const router = require("express").Router();
const Product = require("../database/schema/Product");

router.get("/", async (req, res) => {
  const data = await Product.find({});

  res.json(data);
});

router.post("/add", async (req, res) => {
  const productData = req.body;
  await Product.create(productData);

  res.json({ success: true });
});

router.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  await Product.deleteOne({ _id: productId });
  res.json({ success: true });
});

module.exports = router;
