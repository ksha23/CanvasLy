// creates a new OAuth2Client object and generates the url that will be used for the consent dialog.

var express = require("express");
var router = express.Router();

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

// localhost:5173/request path
router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = "http://localhost:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
  });

  res.json({ url: authorizeUrl });
});

// get user data
router.get("/getUserData", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  if (req.session.isLoggedIn) {
    res.status(200).json(req.session.name);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// logout
router.get("/logout", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  res.clearCookie("session-token");
  res.clearCookie("connect.sid");
  res.status(200).json({ message: "Successfully logged out" });
});

module.exports = router;
