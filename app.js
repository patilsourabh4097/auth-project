const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const User = require("./models/user");

const authRoute = require("./routes/auth");
const indexRoute = require("./routes/index");
const messageRoute = require("./routes/message");

const app = express();
dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(expressLayouts);
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { msg: "that user is not registered" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "password incorrect" });
          }
        });
      })
      .catch((err) => console.log(err));
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRoute);
app.use("/message", messageRoute);
app.use("/auth", authRoute);

PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server has started on port ${PORT}`));
