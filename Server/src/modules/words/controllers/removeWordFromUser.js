const User = require('../../user/userModel');

const removeWordFromUser = async (req, res) => {
  const _id = req.params.userId;
  const wordId = req.body.wordId;

  User.updateOne(
    { _id: _id },
    { $pull: { words: wordId } },
    { multi: true, safe: true },
    function (error, doc) {
      if (error) {
        res.status(200).json(error);
      } else {
        res.status(200).json(doc);
      }
    }
  );
};

module.exports = removeWordFromUser;

/* Must send req.body in array with the key-value pattern bellow
 *[    {
 *      "propName" : "author", "value": "Пушкин!"
 *    }
 *]
 *
 */
