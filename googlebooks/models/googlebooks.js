const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBooks = new mongoose.Schema({
    authors: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
  });

  const GoogleBooks = mongoose.model("GoogleBooks", googleBooks);

  module.exports = GoogleBooks;