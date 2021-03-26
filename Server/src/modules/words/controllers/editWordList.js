const WordList = require('../wordListModel');

const editWordList = (req, res) => {
  const _id = req.params.listId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  WordList.updateOne({ _id: _id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Edit WordList Failed', error: error });
    });
};

module.exports = editWordList;

/* Must send req.body in array with the key-value pattern bellow
 *[    {
 *      "propName" : "author", "value": "Пушкин!"
 *    }
 *]
 *
 */
