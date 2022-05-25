require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

app.post("/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
  res.json({ accessToken: token });
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
