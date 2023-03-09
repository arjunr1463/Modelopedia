const jwt = require("jsonwebtoken");
const User = require("../models/users/usermodel");
const Client=require("../models/clients/ClientModel")


//model
const verifyJwt = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving user" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ user });
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//client
const clientVerifyJwt = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    Client.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error retrieving user" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({ user });
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
  

module.exports = { verifyJwt,clientVerifyJwt };
