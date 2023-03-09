const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  discription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:"Active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Testimony", userSchema);
