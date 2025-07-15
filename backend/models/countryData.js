const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    flagUrl: String,
    defenseRank: Number,
    fleetSize: Number, // total count of all aircraft
    fighterCount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("countryData", countrySchema);
