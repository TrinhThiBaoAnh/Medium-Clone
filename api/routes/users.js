const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
 
  if (req.body.id == req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
       console.log('req.body', req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:userId", async (req, res) => {
  try {
    let users;
    users = await User.find();
    // console.log(req.params.userId)
    let id;
    for (var i = 0;i<users.length;i++){
      if (users[i].userId == req.params.userId ){
          id = users[i].id;
          break;
      }
    }
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USERS
router.get("/", async (req, res) => {
 
  try {
    let users;
    users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get("/pro", async (req, res) => {
 
//   try {
//     let users;

//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//GET FOLLOWINGS
router.get("/followings/:userId", async (req, res) => {
  try {
    let users;
    users = await User.find();
    let id;
    for (var i = 0;i<users.length;i++){
      if (users[i].userId ==  req.params.userId){
          id = users[i].id;
          break;
      }
    }
    const user = await User.findById(id);
    const followings = await Promise.all(
      user.followings.map((followingId) => {
        return User.findById(followingId);
      })
    );
    let followingList = [];
    followings.map((following) => {
      const { userId, username, profilePic } = following;
      followingList.push({ userId, username, profilePic });
    });
    res.status(200).json(followingList)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/followers/:userId", async (req, res) => {
  try {
    let users;
    users = await User.find();
    let id;
    for (var i = 0;i<users.length;i++){
      if (users[i].userId ==  req.params.userId){
          id = users[i]._id;
          break;
      }
    }
    const user = await User.findById(id);
    // console.log(user);
    let id_followers = user.followers.map((followerId) => {
      for (var i = 0;i<users.length;i++){
        if (users[i].userId ==  followerId){
            return users[i]._id;
        }
      }
    })
    // console.log(id_followers);
    const followers = await Promise.all(
      id_followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    // console.log('followers', followers);
    // let followerList = [];
    // followers.map((follower) => {
    //   const { usesId, username, profilePic } = follower;
    //   followerList.push({ userId, username, profilePic });
    // });
    res.status(200).json(followers)
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user

router.put("/:id/follow", async (req, res) => {

  // console.log('req.body.userId', req.body.userId);
  // console.log('req.params.id', req.params.id);
  let users;
    users = await User.find();
    let author_id;//author
    for (var i = 0;i<users.length;i++){
      if (users[i].userId ==  req.params.id){
          author_id = users[i]._id;
          break;
      }
      
    }
    for (var i = 0;i<users.length;i++){
      if (users[i]._id==req.body.userId){
        user_id  = users[i].userId;
      }
    }
  // console.log(id);
  // console.log(req.body.userId==author_id);
  if (req.body.userId != author_id) {
    try {
      const user = await User.findById(author_id); //author
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(user_id)) {
        await user.updateOne({ $push: { followers: user_id } });
        await currentUser.updateOne({ $push: { followings: parseInt(req.params.id) } });
        res.status(200).json(currentUser);
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    let users;
    users = await User.find();
    let author_id;
    for (var i = 0;i<users.length;i++){
      if (users[i].userId ==  req.body.userId){
        author_id = users[i]._id;
        break;
      }
    }
    let user_id;
    for (var i = 0;i<users.length;i++){
      if (users[i]._id == req.params.id){
        user_id = users[i].userId;
        break;
      }
    }
  // var mongoose = require('mongoose');
  // var tmp = mongoose.Types.ObjectId(req.params.id)
  if (author_id != req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const author = await User.findById(author_id); // author
      if (user.followings.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followings: req.body.userId } });
        await author.updateOne({ $pull: { followers: user_id } });
        res.status(200).json(user);
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});


module.exports = router;