const express = require("express");
const cors = require("cors");
const debug = require("debug")("server:app.js");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  debug(`Server is running on http://localhost:${PORT}`);
});
