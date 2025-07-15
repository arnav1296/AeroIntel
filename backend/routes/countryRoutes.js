const express = require("express");
const router = express.Router();
const jetData = require("../models/jetData");
const countryData = require("../models/countryData");

router.get("/", async (req, res) => {
  try {
    const countries = await countryData.find().sort({ name: 1 });
    res.json(countries);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching countries" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const countries = await countryData.find(query).sort({ name: 1 });
  } catch (err) {
    res.status(500).json({ msg: "Error searching countries" });
  }
});

//get country detiails using name
router.get("/name/:countryName", async (req, res) => {
  try {
    const { countryName } = req.params;

    const country = await countryData.findOne({
      name: { $regex: new RegExp(countryName, "i") },
    });


    if (!country) {
      return res.status(404).json({ msg: "Country not found" });
    }

    res.json(country);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching country" });
  }
});

// get country with its aircraft by name
router.get("/name/:countryName/fighters", async (req, res) => {
  try {
    const { countryName } = req.params;
    const country = await countryData.findOne({
      name: { $regex: new RegExp(countryName, "i") },
    });
    if (!country) {
      return res.status(404).json({ msg: "Country not found" });
    }

    const activeFighters = await jetData
      .find({
        jetCountry: { $regex: new RegExp(country.name, "i") },
      })
      .sort({ name: 1 });

    res.json({
      country: country,
      activeFighters: activeFighters,
      activeFighterCount: activeFighters.length,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching country aircraft" });
  }
});

// create country
router.post("/", async (req, res) => {
  try {
    const country = new countryData(req.body);
    const saved = await country.save();
    res.status(201).json(country);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update country
router.put("/:id", async (req, res) => {
  try {
    const updatedCountry = await countryData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({ msg: "Country not found" });
    }
    res.json(updatedCountry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete country
router.delete("/:id", async (req, res) => {
  try {
    const deletedCountry = await countryData.findByIdAndDelete(req.params.id);
    if (!deletedCountry) {
      return res.status(404).json({ msg: "Country not found" });
    }
    res.json({ msg: "Country deleted successfully", deletedCountry });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting country" });
  }
});

module.exports = router;
