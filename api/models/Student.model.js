const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  {
    virtuals: true,
    toJSON: {
      virtuals: true,
    },
  }
);

StudentSchema.virtual("like", {
  ref: "Like",
  localField: "_id",
  foreignField: "student",
  justOne: true,
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
