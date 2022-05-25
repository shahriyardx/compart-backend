const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
