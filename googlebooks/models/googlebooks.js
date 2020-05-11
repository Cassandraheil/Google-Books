const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBooks = new mongoose.Schema({
    authors: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
  });

  const GoogleBooks = mongoose.model("GoogleBooks", googleBooks);

  module.exports = GoogleBooks;