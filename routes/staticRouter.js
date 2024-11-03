const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Adjust the path based on your folder structure

// router.get("/", async (req, res) => {
//   try {
//     const allurls = await URL.find({});
//     return res.render("home", {
//       urls: allurls,
//     });
//   } catch (error) {
//     console.error("Error fetching URLs:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });
// function isAuthenticated(req, res, next) {
//   console.log(req.user);
//   if (req.user) return next();
//   return res.redirect("/login");
// }
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/", async (req, res) => {
  ///console.log(req.user);
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

module.exports = router;
