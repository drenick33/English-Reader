const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  }, //Unique doesn't do any validation, but rather optimizes the database
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  signupDate: Date,
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
  avatar: { type: String, required: false },
  wordLists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'WordList',
    default: [],
  },
  words: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Word',
    default: [],
  },
  finishedStories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story',
    default: [],
  },
  curStories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story',
    default: [],
  },
});

module.exports = mongoose.model('User', UserSchema);
