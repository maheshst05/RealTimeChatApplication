const express = require('express');
const userRoute = express.Router();
const { userModel } = require('../Model/userModel');
const bcrypt = require("bcrypt");

userRoute.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await userModel.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await userModel.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword,
        });
        //  delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        console.log(error);
    }
});

userRoute.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.find({ username });

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    return res.json({ status: true, user });
                } else {
                    return res.json({ msg: "Incorrect Username or Password", status: false });
                }
            });
        } else {
            res.send({ "msg": "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

userRoute.patch("/update/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          isAvatarImageSet: true,
          avatarImage:avatarImage
        }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (error) {
      console.error(error); 
      res.status(500).send('An error occurred'); // Send a 500 Internal Server Error response
    }
  });
  module.exports = {
    userRoute
};
