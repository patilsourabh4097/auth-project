const express = require("express");

const Message = require("../models/message");

exports.createMsg = (req, res) => {
  res.render("create-msg");
};

exports.postMsg = async (req, res, next) => {
  const { title, note, name } = req.body;

  const msg = await new Message({
    heading: title,
    content: note,
    userName: name,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/dashboard");
  });
};
