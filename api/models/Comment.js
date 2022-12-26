const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    comId:{
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl:{
        type: String,
        default: "avatar/default0.jpg",
    },
    userProfile:{
        type: String,
        required: false,
    },
    userId:{
        type: String,
        required: true,
    },
    fullName:{
      type: String,
      required: false,
    },
    postId:{
        type: String,
        required: true,
    },
    replies:{
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);
// const commentSchema = new Schema({
//   text: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
// });
module.exports = mongoose.model("Comment", CommentSchema);
