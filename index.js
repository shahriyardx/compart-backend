require("dotenv").config();
require("./database/mongodb.init");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Models
const User = require("./database/schema/User");
const Product = require("./database/schema/Product");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  const logger = require("./utils/logger");
  app.use(logger);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  res.json(user);
});

app.put("/user/update/", async (req, res) => {
  const { email, ...newData } = req.body;
  await User.updateOne({ email }, newData);

  res.json({ success: true });
});

app.get("/products", async (req, res) => {
  const data = await Product.find({});

  res.json(data);
});

app.post("/products/add", async (req, res) => {
  const productData = req.body;
  await Product.create(productData);

  res.json({ success: true });
});

app.post("/login", async (req, res) => {
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

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
