const WordList = require('../wordListModel');

const getAllWords = (req, res) => {
  WordList.find()
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc.length > 0) {
        const response = {
          message: 'getAllWordLists Success',
          count: doc.length,
          lists: doc,
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'There are no Word Lists :(' });
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
