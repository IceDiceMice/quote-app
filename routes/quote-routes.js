const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectId;
const Quotes = require("../models/quotes-schema");
const cors = require("cors");

router.get("/", cors(), async (req, res) => {
  // try {
  //   const quote = await Quotes.find();
  //   res.json(quote);
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).send("Error");
  // }
  res.json([
    {
      _id: "61ac624fc2ce6c6beb50f786",
      quote:
        "Perfection is not attainable, but if we chase perfection we can catch excellence..",
      author: "Vince Lombardi",
      __v: 0,
    },
    {
      _id: "61aea8783bc58a7ba224ad42",
      quote:
        "I keep asking myself these three questions.. What do you have? What do you want? What will you give up?",
      author: "Jack Ma",
      __v: 0,
    },
  ]);
});
router.post("/add", cors(), async (req, res) => {
  try {
    let quote = new Quotes(req.body);
    await quote.save();
    res.status(200).json({ quote: "quote added successfully" });
  } catch (err) {
    res.status(400).send("adding new quote failed");
    console.log(err);
  }
});
router.delete("/delete/:id", cors(), async (req, res) => {
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
