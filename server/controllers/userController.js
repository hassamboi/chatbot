const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller to register a user
const user_register = (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // check if the email is already registered
  User.findOne({ email }).then(user => {
    if (user) return res.status(409).json({ msg: "Email already registered" });

    // else create new instance of user for registration
    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ msg: "Invalid data received" });

        newUser.password = hash;

        // register the user and return the data as response
        newUser.save().then(user => {
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          });
        });
      });
    });
  });
};

// controller to authenticate and log in a user
const user_login = (req, res) => {
  const { name, email, password } = req.body;

  // check if the email is already registered
  User.findOne({ email }).then(user => {
    if (!user) return res.status(409).json({ msg: "User does not exist" });

    // validate password sent by the client
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // generate token and send payload with token as a response back
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  });
};

// exporting the controllers
module.exports = {
  user_register,
  user_login,
};
