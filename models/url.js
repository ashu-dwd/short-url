const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);
const URL = mongoose.model("URL", schema);
module.exports = URL;
