const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postId:{
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    desc:{
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    authorId:{
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
      default: [],
    },
    tags:{
      type: Array,
      required: false,
      default: [],
    },
    views: {
      type: Number,
      required: false,
    },
    likes:{
      type: Array,
      required: false,
      default: [],
    },
    shares:{
      type: Array,
      required: false,
      default: [],
    },
    published:{
      type: Boolean,
      required: false,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
