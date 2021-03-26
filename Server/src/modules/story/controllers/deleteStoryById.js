const Story = require('../storyModel');

const deleteStoryById = (req, res) => {
  const _id = req.params.storyId;
  Story.deleteOne({ _id: _id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'Story delete by Id Failed', error: error });
    });
};

module.exports = deleteStoryById;
