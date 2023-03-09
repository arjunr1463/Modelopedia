const jwt = require("jsonwebtoken");
const Client = require("../../models/clients/ClientModel");
const User = require("../../models/users/usermodel");
const nodemailer = require("nodemailer");
const sharp = require("sharp");
const mongoose = require("mongoose");
const crypto = require("crypto");

//create clients
const createClient = async (req, res) => {
  const email = req.body.email;
  const findClient = await Client.findOne({ email });
  if (!findClient) {
    const newdata = new Client({
      fullname: req.body.fullname,
      companyname: req.body.companyname,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      address: req.body.address,
      city: req.body.city,
      postcode: req.body.postcode,
      state: req.body.state,
      password: req.body.password,
      confirmpassword: req.body.password,
      cmpnycertificate: {
        data: await sharp(req.files[0].buffer)
          .resize(800)
          .jpeg({ quality: 50 })
          .toBuffer(),
        contentType: req.files[0].mimetype,
      },
      cmpnylogo: {
        data: await sharp(req.files[1].buffer)
          .resize(500, 500, { fit: "inside" })
          .jpeg({ quality: 30 })
          .toBuffer(),
        contentType: req.files[1].mimetype,
      },
      policy: req.body.policy,
    });
    newdata.save();
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Email_Pass,
      },
    });
    const mailOptions = {
      from: "sales@modelopedia.com",
      to: email,
      subject: "Welcome to Modelopedia!!!",
      html: `
       <p>Hello ${req.body.fullname},</p>
       <br/>
        <p>Thank you for registering on our website! We're excited to have you as a part of our community.</p>
       <br/>
       <p>Best regards,</p>
       <p>Modelopedia</p>
`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json("Successfully Created");
  } else {
    res.json("Email already taken");
  }
};

//forgotpassword
const Clientforgotpassword = async (req, res) => {
  const email = req.body.email;
  const id = req.params.id;

  if (id !== "client") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await Client.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;

  try {
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Email_Pass,
      },
    });

    const mailOptions = {
      from: "sales@modelopedia.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.fullname},</p>
        <br/>
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/resetpasswordClient/${token}">${process.env.CLIENT_URL}/resetpasswordClient/${token}</a>
        <br/>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <br/>
        <p>Best regards,</p>
        <p>Your website team</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to send reset password email" });
      } else {
        return res
          .status(200)
          .json({ message: "Password reset email sent", token: token });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to save reset password token" });
  }
};

//ResetToken
const Clientresettoken = async (req, res) => {
  const { token } = req.params;
  const { password, confirmpassword } = req.body;

  try {
    const user = await Client.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    user.password = password;
    user.confirmpassword = confirmpassword;
    if (password != confirmpassword) {
      return res.status(200).json({ message: "Password not matched" });
    } else {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(200).json({ message: "Password reset successful" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};

//EmailAlreadytaken
const clientEmailAlreadyTaken = async (req, res) => {
  try {
    const email = req.query.email;
    const findEmail = await Client.findOne({ email: email });
    const isTaken = !!findEmail;
    res.json(isTaken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const clientPhoneAlreadyTaken = async (req, res) => {
  try {
    const mobile = req.query.mobile;
    const findEmail = await Client.findOne({ mobile: mobile });
    const isTaken = !!findEmail;
    res.json(isTaken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//createcastingcall
const createClientCasting = async (req, res) => {
  try {
    const users = await User.find();
    const emails = users.map((user) => user.email);
    const title = req.body.title;
    const discription = req.body.discription;

    const compressedImage = await sharp(req.file.buffer)
      .resize(650, 350)
      .jpeg({ quality: 40 })
      .toBuffer();

    const image = {
      data: compressedImage,
      contentType: req.file.mimetype,
    };

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const client = await Client.findById(userId);
    if (!client) return res.status(404).send({ message: "Client not found" });

    const castingCall = { title, discription, image };
    client.castingcall.push(castingCall);
    await client.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Email_Pass,
      },
    });
    const mailOptions = {
      from: "sales@modelopedia.com",
      to: emails.join(", "),
      subject: "New Casting Call Created",
      html: `<p>A new casting call titled "${title}" has been created. Check it out on the Modelopedia!</p>
      <a href="${process.env.CLIENT_URL}/CastingCalls">${process.env.CLIENT_URL}/CastingCalls</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json("successfully created casting call");
  } catch (err) {
    console.log(err);
    res.json("error creating casting call");
  }
};

//createAdmincastingcall
const createAdminClientCasting = async (req, res) => {
  try {
    const users = await User.find();
    const emails = users.map((user) => user.email);
    const title = req.body.title;
    const discription = req.body.discription;

    const compressedImage = await sharp(req.file.buffer)
      .resize(650, 350)
      .jpeg({ quality: 40 })
      .toBuffer();

    const image = {
      data: compressedImage,
      contentType: req.file.mimetype,
    };

    id = req.params.email;
    const client = await Client.findOne({ email: id });
    if (!client) return res.status(404).send({ message: "Client not found" });

    const castingCall = { title, discription, image };
    client.castingcall.push(castingCall);
    await client.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Email_Pass,
      },
    });
    const mailOptions = {
      from: "sales@modelopedia.com",
      to: emails.join(", "),
      subject: "New Casting Call Created",
      html: `<p>A new casting call titled "${title}" has been created. Check it out on the Modelopedia!</p>
      <a href="${process.env.CLIENT_URL}/CastingCalls">${process.env.CLIENT_URL}/CastingCalls</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json("successfully created casting call");
  } catch (err) {
    console.log(err);
    res.json("error creating casting call");
  }
};

//Updateclientcastingcall
const updateClientCasting = async (req, res) => {
  try {
    const { title, discription } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const client = await Client.findById(userId);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const castingCallId = req.params.id;
    const castingCall = client.castingcall.id(castingCallId);

    if (!castingCall) {
      return res.status(404).send({ message: "Casting call not found" });
    }

    castingCall.title = title || castingCall.title;
    castingCall.discription = discription || castingCall.discription;

    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize(650, 350).toBuffer();
      castingCall.image.data = buffer;
      castingCall.image.contentType = req.file.mimetype;
    }

    await client.save();

    res.json("Successfully updated casting call");
  } catch (err) {
    console.log(err);
    res.json("Error updating casting call");
  }
};

//ClientLogin
const clientlogin = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Login failed. Email not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ error: "Login failed. Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (rememberMe) {
      res.cookie('email', email, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('password', password, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    }

    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: "Login failed. Please try again." });
  }
};


//getAllClient
const getClient = async (req, res) => {
  try {
    const data = await Client.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json("Something went wrong");
  }
};

//getClientbyid
const getClientbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Client.findById(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//get singlecastingcall
async function singleClientCastingCall(req, res, next) {
  const castingCallId = req.params.castingCallId;
  try {
    const client = await Client.findOne({ "castingcall._id": castingCallId });
    if (!client) {
      return res.status(404).json({ message: "Casting call not found" });
    }
    const castingCall = client.castingcall.find(
      (call) => call._id == castingCallId
    );
    if (!castingCall) {
      return res.status(404).json({ message: "Casting call not found" });
    }
    res.json(castingCall);
  } catch (error) {
    next(error);
  }
}

//createCastingCall
const createUserCastingCall = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "User not found" });
    const castingCallId = req.params.castingCallId;
    if (!castingCallId) {
      throw new Error("Casting call ID not found");
    }

    Client.findOne(
      { "castingcall._id": castingCallId },
      function (err, client) {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Failed to apply to casting call" });
        } else if (!client) {
          res.status(404).json({ message: "Casting call not found" });
        } else {
          const castingCall = client.castingcall.id(castingCallId);
          const isUserApplied = castingCall.users.some(
            (user) => user.userId.toString() === userId
          );
          if (isUserApplied) {
            res.json({
              message: "Already applied ",
            });
          } else {
            castingCall.users.push({ userId: userId });
            client.save(function (err) {
              if (err) {
                console.error(err);
                res
                  .status(500)
                  .json({ message: "Failed to apply to casting call" });
              } else {
                res.json({ message: "Applied successfully" });
              }
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid request" });
  }
};

//getcastingmodels
const getcastingmodels = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;
    const client = await Client.findById(clientId).populate(
      "castingcall.users.userId"
    );
    if (!client) return res.status(404).send({ message: "Client not found" });
    else {
      const userEnquiriesDetails = client.castingcall.flatMap((castingcall) => {
        const userEnquiries = castingcall.users.filter(
          (enquired) => enquired.userId
        );
        return userEnquiries.map((enquiry) => ({
          userId: enquiry.userId,
          castingcalltitle: castingcall.title,
        }));
      });
      res.json(userEnquiriesDetails);
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//foradmin
const getcastingmodelsAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const castingCall = await Client.aggregate([
      { $match: { "castingcall._id": mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "castingcall.users.userId",
          foreignField: "_id",
          as: "populatedUsers",
        },
      },
    ]);

    if (castingCall.length === 0) {
      return res.status(404).send("Casting call not found");
    }

    const { title, users } = castingCall[0].castingcall.find(
      (cc) => cc._id.toString() === id
    );
    const populatedUsers = users
      .filter((u) => u.userId)
      .map((u) => {
        const user = castingCall[0].populatedUsers.find((pu) =>
          pu._id.equals(u.userId)
        );
        return user ? user : { _id: u.userId, deleted: true };
      });

    res.send({ title, users: populatedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//getcastingcalls
const getclientcastingcalls = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).send({ message: "Client not found" });
    const castingCalls = client.castingcall;
    res.json(castingCalls);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving casting calls" });
  }
};

//deletecastingcalls
const deleteclientcastingcall = async (req, res) => {
  try {
    const castingCallId = req.params.castingCallId;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const castingCall = client.castingcall.id(castingCallId);
    if (!castingCall) {
      return res.status(404).send({ message: "Casting call not found" });
    }

    if (castingCall.users.length > 0) {
      return res.status(400).send({
        message: "Cannot delete a casting call with applied users",
      });
    }

    castingCall.remove();
    await client.save();

    res.json({ message: "Casting call deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//ModelEnquiry
const modelEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).send({ message: "Client not found" });
    else {
      const user = await User.findById(id);
      const alreadyEnquired = client.enquiredmodels.some(
        (model) => model.userId.toString() === user._id.toString()
      );
      if (alreadyEnquired) {
        return res.status(400).send({ message: "Model already enquired" });
      } else {
        client.enquiredmodels.push({ userId: user._id });
        await client.save();

        //
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.Email,
            pass: process.env.Email_Pass,
          },
        });
        const mailOptions = {
          from: "sales@modelopedia.com",
          to: user.email,
          subject: "Enquiry Message",
          html: `
      <p>Hello ${user.fullName},</p>
      <p>A client has sent an inquiry about modeling opportunities through our website. Please find the details below:</p>
      <p><strong>Client name:</strong> ${client.fullname}</p>
      <p><strong>Client email:</strong> ${client.email}</p>

      <p>Check it Out!!!</p>

      <a href="${process.env.CLIENT_URL}/CastingCalls">${process.env.CLIENT_URL}/CastingCalls</a>

      <p>Thank you,</p>
      <p>Modelopedia</p>
    `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.json("success");
      }
    }
  } catch (error) {
    res.json(error);
  }
};

//deletemodels

const deleteEnquiredModels = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).send({ message: "Client not found" });
    else {
      const user = await User.findById(id);
      const enquiredModelIndex = client.enquiredmodels.findIndex(
        (model) => model.userId.toString() === user._id.toString()
      );
      if (enquiredModelIndex === -1) {
        return res
          .status(400)
          .send({ message: "Model not found in enquired list" });
      } else {
        client.enquiredmodels.splice(enquiredModelIndex, 1);
        await client.save();
        res.json("success");
      }
    }
  } catch (error) {
    res.json(error);
  }
};

//getModels
const getModels = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.id;
    const client = await Client.findById(clientId).populate(
      "enquiredmodels.userId"
    );
    if (!client) return res.status(404).send({ message: "Client not found" });
    else {
      const userEnquiries = client.enquiredmodels.filter(
        (enquired) => enquired.userId
      );
      const userEnquiryDetails = userEnquiries.map((enquiry) => ({
        userId: enquiry.userId,
      }));
      res.json(userEnquiryDetails);
    }
  } catch (error) {
    res.json(error);
  }
};

//ChangePassword
const ClientChangePassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await Client.findById(userId);
    if (!user) return res.status(404).send({ message: "Client not found" });
    else {
      if (req.body.oldpassword === user.confirmpassword) {
        if (req.body.newpassword !== req.body.newconfirmpassword) {
          res.json("Password doesnt match");
        } else {
          await User.findOneAndUpdate(
            (user.password = req.body.newpassword),
            (user.confirmpassword = req.body.newpassword)
          );
          res.json("Password successfully changed");
          user.save();
        }
      } else {
        return res.status(400).send({ error: "old password is incorrect" });
      }
    }
  } catch (err) {
    res.json("error");
    console.log(err);
  }
};

//ClientLogout
const clientlogout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded.exp = Math.floor(Date.now() / 1000) - 10;
    const expiredToken = jwt.sign(decoded, process.env.JWT_SECRET);

    res.send({
      message: "Token has been expired",
      expiredToken,
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

//castingcallActive

const castingactive = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Client.findOneAndUpdate(
      { "castingcall._id": id },
      { $set: { "castingcall.$.status": "active" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "casting not found" });
    }

    res.json({ message: "status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//castingcallInactive

const castingInactive = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Client.findOneAndUpdate(
      { "castingcall._id": id },
      { $set: { "castingcall.$.status": "Inactive" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "casting not found" });
    }

    res.json({ message: "status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//deleteCastingcall
const deleteAdminCastingcall = async (req, res) => {
  const id = req.params.id;
  try {
    const client = await Client.findOne({ "castingcall._id": id });

    if (!client) {
      return res.status(404).json({ error: "Casting call not found" });
    }

    const castingCall = client.castingcall.find((call) => call.id === id);

    if (!castingCall) {
      return res.status(404).json({ error: "Casting call not found" });
    }

    client.castingcall.splice(client.castingcall.indexOf(castingCall), 1);

    await client.save();

    res.status(200).json({ message: "Casting call deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//editcastingcall
const editadmincastingcall = async (req, res) => {
  const { castingCallId } = req.params;
  const { title, discription } = req.body;

  try {
    const client = await Client.findOne({ "castingcall._id": castingCallId });

    if (!client) {
      return res.status(404).json({ error: "Casting call not found" });
    }
    const castingCall = client.castingcall.find(
      (call) => call.id === castingCallId
    );

    if (!castingCall) {
      return res.status(404).json({ error: "Casting call not found" });
    }
    if (title) {
      castingCall.title = title;
    }

    if (discription) {
      castingCall.discription = discription;
    }

    if (req.file) {
      castingCall.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    await client.save();
    res.status(200).json({ castingCall });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//clientactive
const clientActive = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndUpdate(id);
    if (client) {
      client.personalStatus = "Active";
      await client.save();
      res.json("client status updated");
    } else {
      res.json("client not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//client pending
const clientPending = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndUpdate(id);
    if (client) {
      client.personalStatus = "Pending";
      await client.save();
      res.json("client status updated");
    } else {
      res.json("client not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//client Inactive
const clientInactive = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndUpdate(id);
    if (client) {
      client.personalStatus = "Inactive";
      await client.save();
      res.json("client status updated");
    } else {
      res.json("client not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//clientDelete
const clientDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Client.findByIdAndDelete(id);
    res.json("Client deleted successfully");
  } catch {
    res.json("Failed");
  }
};

//adminclientenquiredmodels
const adminclientenquiredmodels = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId).populate(
      "enquiredmodels.userId"
    );
    if (!client) return res.status(404).send({ message: "Client not found" });
    else {
      const userEnquiries = client.enquiredmodels.filter(
        (enquired) => enquired.userId
      );
      const userEnquiryDetails = userEnquiries.map((enquiry) => ({
        userId: enquiry.userId,
      }));
      res.json(userEnquiryDetails);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createClient,
  getClient,
  getClientbyid,
  clientlogin,
  clientlogout,
  createClientCasting,
  singleClientCastingCall,
  createUserCastingCall,
  modelEnquiry,
  ClientChangePassword,
  getModels,
  getcastingmodels,
  deleteEnquiredModels,
  getclientcastingcalls,
  deleteclientcastingcall,
  getcastingmodelsAdmin,
  castingInactive,
  castingactive,
  deleteAdminCastingcall,
  editadmincastingcall,
  updateClientCasting,
  clientActive,
  clientPending,
  clientInactive,
  clientDelete,
  adminclientenquiredmodels,
  clientEmailAlreadyTaken,
  clientPhoneAlreadyTaken,
  createAdminClientCasting,
  Clientforgotpassword,
  Clientresettoken,
};
