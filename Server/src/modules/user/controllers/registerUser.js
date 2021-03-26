const mongoose = require('mongoose');
const User = require('../userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
  User.find({
    $or: [{ email: req.body.email }, { name: req.body.name }],
  }) //Check if email is already used
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({ message: 'Username or email already in use' });
      } else {
        //Email isn't already used
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          //hash password, salt 10 times to prevent dictionary lookups
          if (error) {
            //If hash fails for some reason
            return res.status(500).json({ error: error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              signupDate: Date.now(),
              level: req.body.level,
            });
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
                role: user.role,
              },
              process.env.JWT_KEY,
              { expiresIn: '1h' }
            );
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: 'Registered User!',
                  token: token,
                  user: user,
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  message: 'Register User Failed',
                  error: error,
                });
              });
          }
        });
      }
    });
};

module.exports = registerUser;
