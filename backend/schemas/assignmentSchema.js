const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  reminders: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

const UserToken = mongoose.model("Assignment", assignmentSchema);

module.exports = UserToken;
