const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const visitorRecordRoutes = require("./routes/visitorRecords");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to MongoDB established!"))
  .catch((err) => console.log(err));

app.use("/api/visitor-records", visitorRecordRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
