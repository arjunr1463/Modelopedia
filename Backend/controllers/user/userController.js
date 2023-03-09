const User = require("../../models/users/usermodel");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sharp = require("sharp");
const zlib = require("zlib");

//create
const register = async (req, res) => {
  const email = req.body.email;
  const UserData = await User.findOne({ email: email });
  if (UserData) {
    res.json("email already taken");
    return;
  }
  const userData = req.body;
  try {
    const user = new User(userData);
    const savedUser = await user.save();
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
        <p>Hello ${user.fullName},</p>
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

    const compressedData = zlib.gzipSync(JSON.stringify(user));
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Encoding", "gzip");
    return res.status(200).send(compressedData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Registration failed", error });
  }
};

//Accept NewModel
const acceptNewModel = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id);
    if (user) {
      user.newmodel = false;
      user.save();
      res.json("Accepted");
    } else {
      res.json("User not found");
    }
  } catch {
    res.json("Failed");
  }
};

//forgotpassword
const forgotpassword = async (req, res) => {
  const email = req.body.email;
  const id = req.params.id;

  if (id !== "user") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findOne({ email });

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
        <p>Hello ${user.fullName},</p>
        <br/>
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/resetpassword/${token}">${process.env.CLIENT_URL}/resetpassword/${token}</a>
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
const resettoken = async (req, res) => {
  const { token } = req.params;
  const { password, confirmpassword } = req.body;

  try {
    const user = await User.findOne({
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

//updateUser
const updateUser = async (req, res) => {
  try {
    const update = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      await user.save();
      res.status(200).json({ success: true, data: "Updated Successfully!!!" });
    }
  } catch (error) {
    res.json(error);
  }
};
//updateAdminUser
const updateAdminUser = async (req, res) => {
  try {
    const update = req.body;
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      await user.save();
      res.status(200).json({ success: true, data: "Updated Successfully!!!" });
    }
  } catch (error) {
    res.json(error);
  }
};

//Email already exist
const checkEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const findEmail = await User.findOne({ email: email });
    const isTaken = !!findEmail;
    res.json(isTaken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Mobile already exist
const checkMobile = async (req, res) => {
  try {
    const mobile = req.query.mobile;
    const findEmail = await User.findOne({ mobile: mobile });
    const isTaken = !!findEmail;
    res.json(isTaken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//create stage4
const stage4 = async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!req.files)
      return res.status(400).send({ message: "No images were uploaded" });

    const images = await Promise.all(
      req.files.map(async (file) => {
        const buffer = await sharp(file.buffer)
          .resize({ width: 800, height: 1200 })
          .jpeg({ quality: 30 })
          .toBuffer();
        return {
          image: {
            data: buffer,
            contentType: file.mimetype,
          },
        };
      })
    );

    user.images = user.images.concat(images);
    user.videos.push({
      url: videoUrl,
    });
    await user.save();

    return res.status(200).send({ message: "Images uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred while uploading images" });
  }
};

//AddImage
const AddImage = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!req.files)
      return res.status(400).send({ message: "No images were uploaded" });

    let maxImages = 1;
    if (user.paymentStatus === "success") {
      if (user.paymentType === "Basic") {
        maxImages = 10;
      } else if (
        user.paymentType === "Featured" ||
        user.paymentType === "Diamond"
      ) {
        maxImages = 20;
      }
    }

    if (user.images.length + req.files.length > maxImages) {
      return res
        .status(400)
        .send({ message: `You can only upload up to ${maxImages} images` });
    }

    const images = [];

    for (const file of req.files) {
      const compressedImage = await sharp(file.buffer)
        .resize({ width: 800, height: 1200 })
        .jpeg({ quality: 30 })
        .toBuffer();

      images.push({
        image: { data: compressedImage, contentType: file.mimetype },
      });
    }

    user.images = user.images.concat(images);
    await user.save();
    return res.status(200).send({ message: "Images uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred while uploading images" });
  }
};

//Add Video
const AddVideo = async (req, res) => {
  try {
    const url = req.body.url;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let maxVideos = 0;
    if (user.paymentStatus === "success") {
      switch (user.paymentType) {
        case "Basic":
          maxVideos = 2;
          break;
        case "Featured":
        case "Diamond":
          maxVideos = 5;
          break;
        default:
          maxVideos = 2;
      }
    }

    if (user.videos.length >= maxVideos) {
      return res
        .status(400)
        .send({ message: `You can upload only ${maxVideos} videos` });
    }

    user.videos.push({ url });
    await user.save();

    return res.status(200).send({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while uploading videos" });
  }
};

//Delete video
const deleteUserVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const video = user.videos.find((v) => v._id.toString() === id.toString());
    if (!video) {
      return res.status(404).send({ message: "Video not found" });
    }

    user.videos.pull(video);
    await user.save();
    return res.status(200).send({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while deleting video" });
  }
};

//approvevideo
const approveVideo = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "videos._id": req.params.id },
      { $set: { "videos.$.videostatus": "Approved" } },
      { new: true }
    );
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
      subject: "Video Status",
      html: `
  <p>Hello ${user.fullName},</p>
  <br/>
  <p>Your Videoprofile has been approved</p>
  <br/>
  <br/>
  <p>Check it Out!!!</p>
  <br/>
  <a href="${process.env.CLIENT_URL}/ModelLogin">${process.env.CLIENT_URL}/ModelLogin</a>
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
    return user
      ? res.json({ message: "Video status updated" })
      : res.status(404).json({ message: "Video not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//rejectvideo
const rejectVideo = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "videos._id": req.params.id },
      { $set: { "videos.$.videostatus": "Rejected" } },
      { new: true }
    );
    return user
      ? res.json({ message: "Video status updated" })
      : res.status(404).json({ message: "Video not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//pendingvideo
const pendingVideo = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "videos._id": req.params.id },
      { $set: { "videos.$.videostatus": "Pending" } },
      { new: true }
    );
    return user
      ? res.json({ message: "Video status updated" })
      : res.status(404).json({ message: "Video not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//deleteadmin
const deleteAdminUserVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userid;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const video = user.videos.find((v) => v._id.toString() === id.toString());
    if (!video) {
      return res.status(404).send({ message: "Video not found" });
    }

    user.videos.pull(video);
    await user.save();
    return res.status(200).send({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred while deleting video" });
  }
};

//ApproveImage
const approveImage = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "images._id": req.params.id },
      { $set: { "images.$.imagestatus": "Approved" } },
      { new: true }
    );
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
      subject: "Image Status",
      html: `
  <p>Hello ${user.fullName},</p>
  <br/>
  <p>Your image has been approved</p>
  <br/>
  <br/>
  <p>Check it Out!!!</p>
  <br/>
  <a href="${process.env.CLIENT_URL}/ModelLogin">${process.env.CLIENT_URL}/ModelLogin</a>
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
    return user
      ? res.json({ message: "Image status updated" })
      : res.status(404).json({ message: "Image not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//RejectImage
const rejectImage = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "images._id": req.params.id },
      { $set: { "images.$.imagestatus": "Rejected" } },
      { new: true }
    );
    return user
      ? res.json({ message: "Image status updated" })
      : res.status(404).json({ message: "Image not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Pending
const pendingImage = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { "images._id": req.params.id },
      { $set: { "images.$.imagestatus": "Pending" } },
      { new: true }
    );
    return user
      ? res.json({ message: "Image status updated" })
      : res.status(404).json({ message: "Image not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
//AdminDelete
const admindelete = async (req, res) => {
  const userId = req.params.userId;
  const imageId = req.params.imageId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const image = user.images.id(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.remove();
    await user.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//ModelTrash
const modelTrash = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.isDeleted = true;
    user.personalStatus = "Deleted";
    await user.save();

    return res.status(200).json({ message: "User moved to recycle bin" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

//ModelRestore
const modelRestore = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.isDeleted = false;
    user.personalStatus = "Completed";
    await user.save();

    return res.status(200).json({ message: "User Restored" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

//AddProfilepicture
const AddProfilePicture = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const buffer = await sharp(req.file.buffer)
      .resize(800, 800)
      .jpeg({ quality: 30 })
      .toBuffer();

    user.profilepicture = {
      data: buffer,
      contentType: req.file.mimetype,
    };

    await user.save();
    return res
      .status(200)
      .send({ message: "Profile picture uploaded successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while uploading the profile picture",
    });
  }
};

//Get ProfilePicture
const GetProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findById(id);
    return res.status(200).send({ message: "Images uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.json("Failed..");
  }
};

//deleteImage
const deleteImage = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    user.images.id(req.params.id).remove();
    await user.save();
    res.send({ status: "success", message: "image deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred while deleting image" });
  }
};

//order
const payment = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const instance = new Razorpay({
      key_id: process.env.RAZOR_KEYID,
      key_secret: process.env.RAZOR_KEYSECRET,
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });

    if (req.body.amount === 999) {
      user.paymentType = "Basic";
    } else if (req.body.amount === 3999) {
      user.paymentType = "Featured";
    } else if (req.body.amount === 8999) {
      user.paymentType = "Diamond";
    } else {
      user.paymentType = "invalid";
    }
    const transactionId = crypto.randomBytes(10).toString("hex");
    user.transactionId = transactionId;

    user.save();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

//verify
const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = `${razorpay_order_id || ""}|${razorpay_payment_id || ""}`;
    const expectedSign = crypto
      .createHmac("sha256", "2JKckJa8YAvPBBB79xgkLir1")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      user.paymentStatus = "success";
      user.planEndDate = new Date();
      user.planDate = new Date();
      user.planEndDate.setDate(user.planEndDate.getDate() + 365);
      user.save();
      setTimeout(async () => {
        const updatedUser = await User.findById(userId);
        if (updatedUser.paymentStatus === "success") {
          updatedUser.paymentStatus = "pending";
          const image = updatedUser.images.find(
            (data) => data.imagestatus === "Approved"
          );
          if (image) {
            image.imagestatus = "Pending";
            await updatedUser.save();
          }
        }
      }, 365 * 24 * 60 * 60 * 1000);
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
        subject: "Payment Successful",
        html: `
        <p>Hello,</p>
        <br />
        <p>Your payment of <b>Type: ${user.paymentType}</b> has been successfully processed.</p>
        <p>Transaction ID: ${user.transactionId}</p>
        <br />
        <p>Check it out to verify</p>
        <a href="${process.env.CLIENT_URL}/ModelLogin">${process.env.CLIENT_URL}/ModelLogin</a>
        <p>Thank you for choosing our service!</p>
        <br />
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
      return res.status(200).json({ message: "Payment successfully done!!!" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

//User Progress
const progress = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      const image = User.find(user.images);
      if (user.paymentStatus === "pending" && !user.images[0]) {
        user.progress = 1;
        user.save();
        res.json("image upload stage");
      } else if (user.paymentStatus === "pending" && image) {
        user.progress = 2;
        user.save();
        res.json("Payment stage");
      } else if (user.paymentStatus === "success" && image) {
        user.progress = 3;
        user.save();
        res.json("completed");
      } else {
        res.json("something went wrong");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
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
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: "Login failed. Please try again." });
  }
};

//Logout
const Logout = async (req, res) => {
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

//GetSingleUser

const GetSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.json("no user found");
  }
};

//GetAllUser

const GetAllUser = async (req, res) => {
  const user = await User.find();
  if (user) {
    res.json(user);
  } else {
    res.json("no user found");
  }
};

//ModelLatest

const modellatest = async (req, res) => {
  const user = await User.find();
  if (user) {
    res.json(user);
  } else {
    res.json("no user found");
  }
};

//ModelData

const ModelData = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.json("no user found");
  }
};

//AllModel
const getByStatus = async (req, res) => {
  const { paymentStatus } = req.params;
  const data = await User.find({ paymentStatus: paymentStatus });
  res.json(data);
};

//create Enquiry
const createEnquiry = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      user.enquiry = "Enquired";
      user.save();
      return res.send({ success: "success" });
    }
  } catch (err) {
    console.log(err);
  }
};

//getEnquiryData
const getEnquiryData = async (req, res) => {
  const { enquiry } = req.params;
  const data = await User.find({ enquiry: enquiry });
  res.json(data);
};

//ChangePassword
const ChangePassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
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

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndDelete(id);
    res.json({ msge: "Deleted Successfully", data });
  } catch (err) {
    console.log(err);
    res.json("Something went wrong");
  }
};

//createSpecialStory
const createUserSpecialStory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      const buffer = await sharp(req.file.buffer)
        .resize(800, 1200)
        .jpeg({ quality: 30 })
        .toBuffer();

      const image = {
        featuredimages: {
          data: buffer,
          contentType: req.file.mimetype,
        },
        status: "Pending",
      };
      user.specialstory = image;
      await user.save();
      res.json("Success");
    }
  } catch {
    res.json("Failed");
  }
};

//getUserSpecialStory
const getUserSpecialStory = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch {
    res.json("Failed");
  }
};

//deleteUserSpecialStory
const deleteUserSpecialStory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      user.specialstory = undefined;
      await user.save();
      res.json("Success");
    }
  } catch {
    res.json("Failed");
  }
};

//updateUserSpecialStory
const updateUserSpecialStory = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ error: "Model ID not found" });
    }

    user.specialstory.specialdescription = req.body.specialdescription;
    user.save();
    res.json("Success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};

//adminInactive
const adminspecialstoryInactive = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { "specialstory.status": "Approved" },
      { new: true }
    );
    if (user) {
      res.json("Successful");
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//Adminactive
const adminspecialstoryRejected = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { "specialstory.status": "Rejected" },
      { new: true }
    );
    if (user) {
      res.json("Successful");
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

const deleteAdminUserSpecialStory = async (req, res) => {
  try {
    id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).send({ message: "User not found" });
    else {
      user.specialstory = undefined;
      await user.save();
      res.json("Success");
    }
  } catch {
    res.json("Failed");
  }
};

//Enquiry active
const adminenquiryActive = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id);
    if (user) {
      user.enquiryStatus = "Active";
      user.save();
      res.json("enquiry updated");
    } else {
      res.json("user not found");
    }
  } catch {
    res.json("Failed");
  }
};

//Enquiry Inactive
const adminenquiryInactive = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id);
    if (user) {
      user.enquiryStatus = "Inactive";
      user.save();
      res.json("enquiry updated");
    } else {
      res.json("user not found");
    }
  } catch {
    res.json("Failed");
  }
};

//enquirydelte
const adminenquirydelete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id);
    if (user) {
      user.enquiry = "";
      user.save();
      res.json("succesfully removed");
    }
  } catch {
    res.json("Failed");
  }
};

//deleteMultiple
const deletemultiple = async (req, res) => {
  try {
    const idsToDelete = req.body.ids;
    const result = await User.deleteMany({ _id: { $in: idsToDelete } });
    res.json({ success: true, deletedRowsCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting users" });
  }
};

module.exports = {
  register,
  login,
  checkEmail,
  checkMobile,
  GetSingleUser,
  GetAllUser,
  stage4,
  modellatest,
  ModelData,
  AddImage,
  AddVideo,
  deleteImage,
  AddProfilePicture,
  GetProfilePicture,
  Logout,
  payment,
  verify,
  getByStatus,
  progress,
  createEnquiry,
  getEnquiryData,
  ChangePassword,
  deleteData,
  approveImage,
  rejectImage,
  pendingImage,
  admindelete,
  modelTrash,
  modelRestore,
  createUserSpecialStory,
  deleteUserSpecialStory,
  getUserSpecialStory,
  updateUserSpecialStory,
  adminspecialstoryInactive,
  adminspecialstoryRejected,
  deleteAdminUserSpecialStory,
  deleteUserVideo,
  approveVideo,
  rejectVideo,
  pendingVideo,
  deleteAdminUserVideo,
  updateUser,
  forgotpassword,
  resettoken,
  updateAdminUser,
  adminenquiryActive,
  adminenquiryInactive,
  adminenquirydelete,
  acceptNewModel,
  deletemultiple,
};
