const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

const quotesRouter = require("./routes/quote-routes");

app.get("/", (req, res) => res.send("Hello world!"));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: ["localhost://3000", "https://the-quote-app.herokuapp.com"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/quotes", quotesRouter);

const port = process.env.PORT || 8082;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Server running on port ${port}`));
