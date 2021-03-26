const User = require('../../user/userModel');
const Word = require('../wordModel');

const addWordToUser = async (req, res) => {
  const _id = req.params.userId;
  const wordId = req.body.wordId;

  console.log('WORD_ID');
  console.log(wordId);

  const word = await Word.findById(wordId);
  console.log('WORD');
  console.log(word);

  if (word != null) {
    User.findOneAndUpdate(
      { _id: _id },
      { $push: { words: word } },
      { upsert: true, new: true },
      function (error, doc) {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json(doc);
        }
      }
    );
  } else {
    res.status(404).json('Word not found');
  }
};

module.exports = addWordToUser;

/* Must send req.body in array with the key-value pattern bellow
 *[    {
 *      "propName" : "author", "value": "Пушкин!"
 *    }
 *]
 *
 */
