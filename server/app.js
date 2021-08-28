// Setup
require('dotenv').config()
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const logger = require("morgan");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const spotsRouter = require("./routes/spots");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// PG database setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.on("connect", () => console.log("connnected to database 🥳"));
db.connect();

// Use middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["encryptdemcookies"],
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter(db));
app.use("/register", registerRouter(db));
app.use("/login", loginRouter(db));
app.use("/spots", spotsRouter(db));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
