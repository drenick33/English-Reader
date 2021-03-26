const Word = require('../wordModel');

const getWordById = (req, res) => {
  const _id = req.params.wordId;
  Word.findById(_id)
    .select('-__v')
    .populate('story', 'title author')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'Word not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Word by Id Failed', error: error });
    });
};

module.exports = getWordById;
