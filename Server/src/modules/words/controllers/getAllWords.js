const Word = require('../wordModel');

const getAllWords = (req, res) => {
  Word.find()
    .select('-__v')
    .populate('story', 'title author')
    .exec()
    .then((doc) => {
      if (doc.length > 0) {
        const response = {
          message: 'getAllWords Success',
          count: doc.length,
          words: doc,
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'There are no Words :(' });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Get All Word Lists Failed', error: error });
    });
};

module.exports = getAllWords;
