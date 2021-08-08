const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    rquired: true,
  },
  email: {
    type: String,
    rquired: true,
  },
  password: {
    type: String,
    rquired: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
