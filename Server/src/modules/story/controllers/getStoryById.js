const Story = require('../storyModel');

const getStoryById = (req, res) => {
  const _id = req.params.storyId;
  Story.findById(_id)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Story by Id Failed', error: error });
    });
};

module.exports = getStoryById;
