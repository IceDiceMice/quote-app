const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "https://test-todo-api-884.herokuapp.com",
  methods: "GET, POST, PUT, PATCH, POST, DELETE,OPTIONS, HEAD",
  allowedHeaders: "Content-Type, Authorization,Accept,X-Requested-With",
  credentials: true,
};
app.use(cors(corsOptions));

const quotesRouter = require("./routes/quote-routes");

app.get("/", (req, res) => res.send("Hello world!"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
