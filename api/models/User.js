const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId :{
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    desc:{
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "avatar/default0.jpg",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    interests: {
      type: Array,
      default: [],
    },
    bio:{
      type: String,
      default: "",
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isMember:{
      type: Boolean,
      default: false,
    },
    isPro:{
      type: Boolean,
      default: false,
    },
    readingList:{
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
