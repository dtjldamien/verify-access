require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const verifyRoutes = require("./routes/verify");

const PORT = process.env.MOCK_VERIFY_PORT;

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/mock-verify", verifyRoutes);

app.listen(PORT, () =>
  console.log(`Mock VERIFY server listening on port ${PORT}!`)
);
