const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  Awards: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Awards", userSchema);
