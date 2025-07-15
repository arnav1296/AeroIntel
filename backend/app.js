require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Routes
const jetsRoutes = require("./routes/jetsRoutes");
const countryRoutes = require("./routes/countryRoutes");
app.use("/api/jets", jetsRoutes);
app.use("/api/countries", countryRoutes);

app.get("/", (req, res) => {
  res.send("Atlas on the way wohoo");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("server is running");
});
