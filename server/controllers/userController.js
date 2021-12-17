const User = require("../models/User");
const bcrypt = require("bcryptjs");

// controller to register a user
const user_register = (req, res) => {
  const { name, email, password } = req.body;

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
        newUser.save().then(user =>
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          })
        );
      });
    });
  });
};

// controller to log an already registered user in
const user_login = (req, res) => {};

// exporting the controllers
module.exports = {
  user_register,
  user_login,
};
