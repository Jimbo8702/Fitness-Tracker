const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/workoutmodel");
const path = require("path");
const mongojs = require("mongojs");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
//html get routes
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

// get routes
//api/workouts
app.get("/api/workouts", (req, res) => {
  Workout.find()

    .then((dbwork) => {
      res.json(dbwork);
    })
    .catch((err) => {
      res.json(err);
    });

  // var aggr = Workout.aggregate([
  //   {
  //     $sum: {
  //       exercise: duration,
  //     },
  //   },
  // ]);
  // console.log(aggr);
  // // aggr.options = { allowDiskUse: true };
  // aggr.exec(function (err, workout) {
  //   if (err) res.send(err);
  //   res.json(workout);
  // });
});
//api/workouts/range
app.get("/api/workouts/range", (req, res) => {});
// put route
//api/workout/id
app.put("/api/workouts/:id", async (req, res) => {
  //update push to array exercises $push
  console.log(req.body);
  Workout.updateOne(
    { _id: mongojs.ObjectId(req.params.id) },
    { $push: { exercise: req.body } }
  ).then((workout) => {
    res.json(workout);
  });
});

// api/workouts

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((workout) => {
      console.log("Workout Created!");
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
