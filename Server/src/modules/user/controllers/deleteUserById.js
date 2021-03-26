const User = require('../userModel');

const deleteUserById = (req, res) => {
  const _id = req.params.userId;
  if (req.userData.userId === _id) {
    //Only Delete your own user
    console.log('ran');
    User.deleteOne({ _id: _id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: 'User delete by Id Failed', error: error });
      });
  } else {
    res.status(401).json({ message: 'Auth Failed' });
  }
};

module.exports = deleteUserById;
