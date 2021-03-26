const mongoose = require('mongoose');

const StorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: Date,
  english: { type: [String], required: true }, //Array of English Sentences
  chinese: { type: [String], required: true }, //Array of those Sentences translated to Chinese
  author: { type: String, required: true },
  level: {
    type: String,
    enum: [
      'Beginner',
      'Elementary',
      'Intermediate',
      'Upper Intermediate',
      'Expert',
      'Master',
    ],
    default: 'Intermediate',
  },
  genre: {
    type: String,
    enum: ['poetry', 'dialogue', 'story'],
    required: true,
  },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Story', StorySchema);
