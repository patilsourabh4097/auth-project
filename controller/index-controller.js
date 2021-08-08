const express = require("express");

exports.dashboard = (req, res) => {
  const username = req.user.name;
  res.render("dashboard", {
    name: username,
  });
  return;
};

exports.welcome = (req, res) => {
  res.render("welcome");
  return;
};
