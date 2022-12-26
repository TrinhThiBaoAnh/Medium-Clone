const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
            type: Date,
            required: false,
    },
    fee:{
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);