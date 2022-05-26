const router = require("express").Router();
const User = require("../database/schema/User");

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  res.json(user);
});

router.put("/update", async (req, res) => {
  const { email, ...newData } = req.body;
  await User.updateOne({ email }, newData);

  res.json({ success: true });
});

module.exports = router;
