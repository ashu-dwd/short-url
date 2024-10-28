const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Adjust the path based on your folder structure

router.get("/", async (req, res) => {
  try {
    const allurls = await URL.find({});
    return res.render("home", {
      urls: allurls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
