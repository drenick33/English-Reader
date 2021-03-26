const Word = require('../wordModel');

const deleteWordById = (req, res) => {
  const _id = req.params.wordId;
  Word.deleteOne({ _id: _id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Word delete by Id Failed', error: error });
    });
};

module.exports = deleteWordById;
