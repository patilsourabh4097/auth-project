const express = require("express");

exports.dash = (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
  return;
};

exports.welcome = (req, res) => {
  res.render("welcome");
  return;
};
