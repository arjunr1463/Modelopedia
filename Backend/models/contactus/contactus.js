const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Contactus", userSchema);
