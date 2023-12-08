// Desc: OAuth2 callback route
var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
var { google } = require("googleapis");
dotenv.config();
const UserTokens = require("../mongoose");

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();

  return {
    id: data.sub,
    name: data.name,
    email: data.email,
    picture: data.picture,
  };
}

// get calendar id
const getCalendarId = async (calendar) => {
  return new Promise((resolve, reject) => {
    calendar.calendarList.list({}, (err, res) => {
      if (err) {
        reject("The API returned an error: " + err);
      } else {
        const calendars = res.data.items;
        if (calendars.length) {
          const foundCalendar = calendars.find((cal) =>
            cal.summary.includes("Canvas")
          );
          if (foundCalendar) {
            resolve(foundCalendar.id);
          } else {
            reject("No calendar found with 'Canvas' in the name.");
          }
        } else {
          reject("No calendars found.");
        }
      }
    });
  });
};

// get calendar events
router.get("/getCalendarEvents", async function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  if (req.session.isLoggedIn) {
    const access_token = req.session.access_token;
    // make calendar object

    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: access_token });
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const calendarId = await getCalendarId(calendar);

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(response.data.items);
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

// callback route for Google
router.get("/", async function (req, res, next) {
  const code = req.query.code; // this is the code that Google sends back to us
  try {
    const redirectURL = "http://localhost:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const response = await oAuth2Client.getToken(code);

    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(response.tokens);

    // get user data
    const profile = await getUserData(response.tokens.access_token);

    // database stuff
    try {
      let user = await UserTokens.findOne({ googleId: profile.id });

      if (!user) {
        user = new UserTokens({
          googleId: profile.id,
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token,
        });
        await user.save();
      } else {
        user.accessToken = response.tokens.access_token;
        await user.save();
      }
    } catch (error) {
      console.error(error);
    }

    res.redirect("http://localhost:5173");

    // set session variables
    req.session.isLoggedIn = true;
    req.session.access_token = oAuth2Client.credentials.access_token;
    req.session.save();
  } catch (err) {
    console.error("Error logging in with OAuth2 user", err);
  }
});

module.exports = router;
