const mongoose = require('mongoose');

// const wordSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   word: { type: String, required: true },
//   trans: { type: String, required: true },
//   date: Date,
//   story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
// });

const wordListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  listName: { type: String, required: true },
  date: Date,
  words: { type: [mongoose.Schema.Types.ObjectId], ref: 'Word', default: [] },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('WordList', wordListSchema);
