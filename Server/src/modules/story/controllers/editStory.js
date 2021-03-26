const Story = require('../storyModel');

const editStory = (req, res) => {
  const _id = req.params.storyId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Story.updateOne({ _id: _id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Edit Story Failed', error: error });
    });
};

module.exports = editStory;

/* Must send req.body in array with the key-value pattern bellow
 *[    {
 *      "propName" : "author", "value": "Пушкин!"
 *    }
 *]
 *
 */
