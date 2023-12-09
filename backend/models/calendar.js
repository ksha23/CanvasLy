const mongoose = require("mongoose");

// Schema for assignments
const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  class: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Assignment", "Exam", "Quiz", "Project", "Other"],
    default: "Other",
  },
  priority: {
    type: String,
  },
  reminders: {
    type: [String],
  },
  location: {
    type: String,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

// Schema for calendars
const calendarSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  googleCalendarId: {
    type: String,
  },
  customCalendarId: {
    type: String,
  },
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Assignment, Calendar };
