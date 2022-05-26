const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../database/schema/User");

router.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    await User.create({
      email,
      location: "",
      phone: "",
      education: "",
      linkedin: "",
      role: "Customer",
    });

    user = await User.findOne({ email });
  }

  const payload = { email, ...user._doc, _id: user._id.toString() };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  res.json({ accessToken: token });
});

module.exports = router;
