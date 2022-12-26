const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    tag_id: {
      type: Number,
      required: true,
    },
    tag_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);
