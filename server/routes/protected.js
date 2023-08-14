// routes/protected.js
const express = require("express");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Protected route" });
});

module.exports = router;
