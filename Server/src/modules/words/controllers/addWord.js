const mongoose = require('mongoose');
const Word = require('../wordModel');
const Story = require('../../story/storyModel');

const addWord = (req, res) => {
  const word = new Word({
    word: req.body.word,
    trans: req.body.trans,
    // story: req.body.storyId,
    _id: new mongoose.Types.ObjectId(),

    date: Date.now(),
  });

  word
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Word Created!',
        Word: word,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Create Word Failed',
        error: error,
      });
    });

  // try {
  //   Story.findById(word.story).then((doc) => {
  //     if (doc) {
  //       word
  //         .save()
  //         .then((result) => {
  //           console.log(result);
  //           res.status(201).json({
  //             message: 'Word Created!',
  //             Word: word,
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           res.status(500).json({
  //             message: 'Create Word Failed',
  //             error: error,
  //           });
  //         });
  //     } else {
  //       res.status(404).json({
  //         message: "Didn't find story for the word",
  //       });
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(404).json({
  //     message: "Didn't find story for the word",
  //     error: error,
  //   });
  // }
};

module.exports = addWord;
