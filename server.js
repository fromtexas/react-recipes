const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const PORT = process.env.PORT || 4444;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
