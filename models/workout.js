const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Date,
  exercise: {
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    duration: {
      type: Number,
      required: false,
    },
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
