const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quotesSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
const Quotes = mongoose.model("Quotes", quotesSchema);
module.exports = Quotes;
