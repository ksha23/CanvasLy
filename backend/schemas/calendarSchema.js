const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleCalendarId: {
    type: String,
    required: true,
  },
  customCalenarId: {
    type: String,
    required: false,
  },
  assignments: {
    type: Array,
    required: false,
  },
});

const UserToken = mongoose.model("Calendar", calendarSchema);

module.exports = UserToken;
