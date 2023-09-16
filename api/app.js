const express = require("express");
const cors = require("cors");

const Student = require("./models/Student.model");
const Like = require("./models/Like.model");

const app = express();
const students = require("./data/students");

require("./config/db.config");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STUDENTS

app.get("/", (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/create", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/student/:id", (req, res) => {
  Student.findById(req.params.id)
    .populate("like")
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.patch("/student/:id", (req, res) => {
  console.log("hola estoy en update", req.params.id, req.body);
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.json(err);
    });
});

// LIKES

app.post("/like/:studentId", (req, res) => {
  Like.findOne({ student: req.params.studentId }).then((like) => {
    if (!like) {
      Like.create({ student: req.params.studentId })
        .then((like) => {
          res.json("like is created!");
        })
        .catch((err) => console.error(err));
    } else {
      res.json("Ya tiene like!");
    }
  });
});

app.delete("/like/:studentId", (req, res) => {
  console.log("hola");
  Like.findOne({ student: req.params.studentId }).then((like) => {
    if (like) {
      Like.findOneAndDelete({ student: req.params.studentId })
        .then((like) => {
          res.json("like is deleted!");
        })
        .catch((err) => console.error(err));
    } else {
      res.json("No tiene likes!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
