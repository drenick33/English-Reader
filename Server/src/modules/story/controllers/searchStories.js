const Story = require('../storyModel');

const searchStories = (req, res) => {
  let title = req.body.title;
  let difficulty = req.body.difficulty;
  let genre = req.body.genre;
  let query = {};

  const createQuery = () => {
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (difficulty) {
      query.level = req.body.difficulty;
    }

    if (genre) {
      query.genre = req.body.genre;
    }
  };

  const obtainResults = () => {
    Story.find(query)
      .sort({ date: -1 })
      .limit(10)
      .select('-__v')
      .exec()
      .then((doc) => {
        if (doc.length > 0) {
          const response = {
            message: 'Search Stories Success',
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
        res
          .status(500)
          .json({ message: 'Get All Stories Failed', error: error });
      });
  };

  createQuery();
  obtainResults();
};

module.exports = searchStories;
