const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

module.exports = UserToken;
