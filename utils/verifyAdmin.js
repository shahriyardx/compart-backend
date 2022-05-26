const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.json({ error: "You are not authorized" });
  }

  next();
};

module.exports = verifyAdmin;
