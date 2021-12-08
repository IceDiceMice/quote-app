const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const Quotes = require("../models/quotes-schema");

router.get("/", async (req, res) => {
  try {
    const quote = await Quotes.find();
    res.json(quote);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error");
  }
});
router.post("/add", async (req, res) => {
  try {
    let quote = new Quotes(req.body);
    await quote.save();
    res.status(200).json({ quote: "quote added successfully" });
  } catch (err) {
    res.status(400).send("adding new quote failed");
    console.log(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Quotes.collection.deleteOne({ _id: ObjectID(`${id}`) });
    res.status(200).json("Quote deleted!");
  } catch (err) {
    res.status(400).json("Unexpected error!");
    console.log(err);
  }
});
module.exports = router;
