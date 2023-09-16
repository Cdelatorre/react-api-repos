const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
