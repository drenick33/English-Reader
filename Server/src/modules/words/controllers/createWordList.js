const mongoose = require('mongoose');
const WordList = require('../wordListModel');

const addWord = (req, res) => {
  const list = new WordList({
    _id: new mongoose.Types.ObjectId(),
    listName: req.body.listName,
    date: Date.now(),
    owner: req.userData.userId,
  });
  list
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Word List Created!',
        WordList: list,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Add Story Failed',
        error: error,
      });
    });
};

module.exports = addWord;
