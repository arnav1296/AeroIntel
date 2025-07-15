const express = require("express");
const router = express.Router();
const jetData = require("../models/jetData");

router.get("/", async (req, res) => {
  try {
    const list = await jetData.find().sort({ name: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching jets" });
  }
});

//search jets using name
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query.name = { $regexp: new RegExp(name, "i") };
    }
    const aircraft = await jetData.find(query).sort({ name: 1 });
    res.json(aircraft);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching aircraft" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const saved = await jetData.insertMany(data);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAircraft = await jetData.findByIdAndDelete(req.params.id);
    if (!deletedAircraft) {
      return res.status(404).json({ msg: "Country not found" });
    }
    res.json({msg: "Aircraft deleted successfully", deletedAircraft});
  } catch (err) {
    res.status(500).json({ msg: "error deleting aircraft" });
  }
});

module.exports = router;
