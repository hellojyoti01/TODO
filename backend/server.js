const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//

app.use("/api/v1", require("./routes/index"));
app.use(require("./controllers/error.controller"));

app.use("*", require("./routes/404"));

module.exports = app;
