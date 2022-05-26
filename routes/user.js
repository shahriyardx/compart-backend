const router = require("express").Router();
const User = require("../database/schema/User");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  res.json(user);
});

router.put("/update", async (req, res) => {
  const { email, ...newData } = req.body;
  await User.updateOne(
    { email },
    {
      $set: newData,
    }
  );

  res.json({ success: true });
});

router.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  await User.deleteOne({ _id: userId });
  res.json({ success: true });
});

module.exports = router;
