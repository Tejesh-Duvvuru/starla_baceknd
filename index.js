const express = require("express");
require("dotenv").config();
const { db } = require("./db/config");
const userImage = require("./routes/userImage");

const app = express();
const port = process.env.PORT || 80;
app.use(express.json());

db.authenticate()
  .then(() => {
    console.log("Postgres connected");
  })
  .catch((err) => {
    console.log("postgre err=>" + err);
  });

app.get("/", async (req, res) => {
  res.json("I am running");
});

app.use("/user", userImage);

app.listen(process.env.port, (err) => {
  if (err) {
    console.log("Unable to run");
    return "Unable to run";
  }
  console.log(`Server running on  ${port}`);
});
