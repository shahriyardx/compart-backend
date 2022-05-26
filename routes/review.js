const router = require("express").Router();
const Review = require("../database/schema/Review");
const verifyJwt = require("../utils/verifyJwt");

router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

router.post("/create", verifyJwt, async (req, res) => {
  await Review.create(req.body);
  res.json({ success: true });
});

module.exports = router;
