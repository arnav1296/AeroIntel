const mongoose = require("mongoose");

const JetSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    manufacturer: String,
    jetCountry: String,
    imgUrl: String,
    speed: String,
    range: String,
    enteredService: Number,
    overview: String,
    cost: String,
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jetData", JetSchema);
