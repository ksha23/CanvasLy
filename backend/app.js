var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var authRouter = require("./routes/oauth");
var requestRouter = require("./routes/request");
var assignmentRouter = require("./routes/assignments");
// var calendarRouter = require("./routes/calendar");

// var htmlAuthRouter = require("./routes/htmlAuth");
// var htmlFileRouter = require("./routes/htmlResponse");

var session = require("express-session");
var app = express();

// setup cors
app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", [
    "X-Requested-With",
    "content-type",
    "credentials",
  ]);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.status(200);
  next();
});

// setup session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// setup middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add some routes
app.use("/oauth", authRouter);
app.use("/request", requestRouter);
app.use("/", assignmentRouter);
// app.use("/calendar", calendarRouter);

// app.use("/htmlAuth", htmlAuthRouter);
// app.use("/htmlResponse", htmlFileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

module.exports = app;
