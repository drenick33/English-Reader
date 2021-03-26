const User = require('../userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Error Message always the same for security, attackers won't know if it failed since there's no email, or if the password is wrong

const loginUser = (req, res) => {
  User.findOne({ email: req.body.email }) //Check if email is already used
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({ message: 'Auth Failed' });
        //Email not, found. Send back this error instead of 404 for security purposes
      } else {
        //Email isn't already used
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          //Compare password with has stored in db
          if (error) {
            //If hash fails for some reason
            return res.status(401).json({ message: 'Auth Failed' }); //This error for security
          } else {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user._id,
                  role: user.role,
                },
                process.env.JWT_KEY
                // { expiresIn: '1h' }
              );
              return res
                .status(200)
                .json({ message: 'Auth Succesful', token: token });
            }
            return res.status(401).json({ message: 'Auth Failed' }); //Wrong Password
          }
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({ message: 'Auth Failed', error });
    });
};

module.exports = loginUser;
