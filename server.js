const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

const quotesRouter = require("./routes/quote-routes");

app.get("/", (req, res) => res.send("Hello world!"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: ["http://localhost:3000", "https://the-quote-app.netlify.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://the-quote-app.herokuapp.com"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api/quotes", quotesRouter);

const port = process.env.PORT || 8082;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Server running on port ${port}`));
