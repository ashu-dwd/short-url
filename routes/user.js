const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/user.js");
router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
