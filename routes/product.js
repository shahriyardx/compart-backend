const router = require("express").Router();
const Product = require("../database/schema/Product");
const verifyAdmin = require("../utils/verifyAdmin");
const verifyJwt = require("../utils/verifyJwt");

router.get("/", async (req, res) => {
  const data = await Product.find({});

  res.json(data);
});

router.post("/add", [verifyJwt, verifyAdmin], async (req, res) => {
  const productData = req.body;
  await Product.create(productData);

  res.json({ success: true });
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  res.json(product);
});

router.delete(
  "/delete/:productId",
  [verifyJwt, verifyAdmin],
  async (req, res) => {
    const { productId } = req.params;
    await Product.deleteOne({ _id: productId });
    res.json({ success: true });
  }
);

module.exports = router;
