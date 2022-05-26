require("dotenv").config();
require("./database/mongodb.init");
const express = require("express");
const cors = require("cors");

// Routers
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");

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

// Use Routers
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter);

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
