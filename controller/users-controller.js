const bcrypt = require("bcryptjs");
const express = require("express");
const Message = require("../models/Message");
const passport = require("passport");
const User = require("../models/User");

exports.login = (req, res, next) => {
  res.render("login", { user: req.user });
};

exports.register = (req, res, next) => {
  res.render("register", { user: req.user });
};

exports.registerHandle = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please provide all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "Password dont match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be min 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email has already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const user = new User({
          name,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

exports.loginHandle = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.logoutHandle = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
};

exports.createMsg = (req, res) => {
  res.render("create-msg");
};

exports.postMsg = async (req, res, next) => {
  const msg = await new Message({
    heading: req.body.title,
    content: req.body.note,
    username: req.user.name,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/dashboard");
  });
};
