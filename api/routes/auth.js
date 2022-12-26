const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    let nextId;
    const users = await User.find();
    if (users.length == 0) {
      nextId =1;
    }
    else {
      let tmp = users.map(function(item){
        return item.userId;
      });
      nextId = Math.max(...tmp) + 1;
    }
   
    // console.log(users);
    const newUser = new User({
      userId: nextId,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      interests: req.body.interests ? req.body.interests : [],
      bio: req.body.bio ? req.body.bio : "",
    });
    
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
   
  }
});

module.exports = router;
