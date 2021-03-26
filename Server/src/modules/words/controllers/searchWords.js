const searchWords = (req, res) => {
  res.status(200).json({
    message: 'Search Words Works!!',
  });
};

module.exports = searchWords;
