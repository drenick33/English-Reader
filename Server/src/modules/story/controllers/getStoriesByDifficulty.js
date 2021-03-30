const Story = require('../storyModel');

const getStoriesByDifficulty = (req, res) => {
  let difficulty = req.params.difficulty;
  let limit = parseInt(req.params.limit);

  if (!limit) {
    limit = 1000;
  }

  Story.find({ level: difficulty })
    .sort({ date: -1 })
    .limit(limit)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc.length > 0) {
        const response = {
          message: 'getStoryByDifficulty Success',
          count: doc.length,
          stories: doc,
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: 'There are no Stories :(' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Get All Stories Failed', error: error });
    });
};

module.exports = getStoriesByDifficulty;
