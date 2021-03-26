const WordList = require('../wordListModel');

const getWordListById = (req, res) => {
  const _id = req.params.listId;
  WordList.findById(_id)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'WordList not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'WordList by Id Failed', error: error });
    });
};

module.exports = getWordListById;
