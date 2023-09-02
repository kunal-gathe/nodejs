const express = require("express");
const mongoose = require("mongoose");
const categories = require("./routes/categories");
const students = require("./routes/student");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1/learningPlatform")
  .then(() => console.log("Connection established"))
  .catch(() => "Connection closed");

// mongoose.connect()

app.use(express.json());
app.use("/api/category", categories);
app.use("api/student", students);

app.listen(3000, () => {
  console.log("Port is running on port 3000");
});
