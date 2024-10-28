const express = require("express");
const app = express();
const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const port = 3000;
const staticRoute = require("./routes/staticRouter");
// Connect to MongoDB
connectDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongoDB connected")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", staticRoute);
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

// URL routes
app.use("/url", urlRoute);

// Redirecting short URLs
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    // Find the URL by shortId
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamps: Date.now() } } },
      { new: true } // Return the updated document
    );

    // Redirect to the original URL if entry is found
    if (entry) {
      return res.redirect(entry.redirectURL);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error retrieving URL:", error);
    return res.status(500).send("Server error");
  }
});

// Start the server
app.listen(port, () => console.log(`SERVER IS RUNNING AT PORT: ${port}`));