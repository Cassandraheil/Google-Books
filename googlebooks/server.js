const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/schemaexample", { useNewUrlParser: true });


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const googleBooks = new mongoose.Schema({
  authors: String,
  description: String,
  image: String,
  link: String,
  title: String
});
// Define API routes here

// Send every other request to the React app

// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
