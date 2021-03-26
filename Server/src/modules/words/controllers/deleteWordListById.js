const WordList = require('../wordListModel');

const deleteWordListById = (req, res) => {
  const _id = req.params.listId;
  WordList.deleteOne({ _id: _id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'WordList delete by Id Failed', error: error });
    });
};

module.exports = deleteWordListById;
