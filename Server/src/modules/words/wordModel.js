const mongoose = require('mongoose');
//Might delete this after testing

const wordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: { type: String, required: true },
  trans: { type: String, required: true },
  date: Date,
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: false,
  },
});

module.exports = mongoose.model('Word', wordSchema);
