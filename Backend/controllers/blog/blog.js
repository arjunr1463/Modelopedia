const Blog = require("../../models/blog/blog");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const nodemailer = require("nodemailer");
const newsletter = require("../../models/newsletter/newsletter");

//create Blog
const createBlog = asyncHandler(async (req, res) => {
  const news = await newsletter.find();
  const buffer = await sharp(req.file.buffer).jpeg({ quality: 30 }).toBuffer();
  const newdata = await new Blog({
    title: req.body.title,
    discription: req.body.discription,
    image: {
      data: buffer,
      contentType: req.file.mimetype,
    },
  });
  newdata.save();
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Email_Pass,
    },
  });
  const emailList = news.map((item) => item.email);
  const mailOptions = {
    from: "sales@modelopedia.com",
    to: emailList.join(","),
    subject: "New Blog Created",
    html: `
     <br/>
      <p>We have created a new blog of ${req.body.title}.Please check it out</p>
     <br/>
     <br/>
      <p>Check it Out!!!</p>
     <br/>
     <a href="${process.env.CLIENT_URL}/Blog">${process.env.CLIENT_URL}/Blog</a>
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

  res.json("Blog created successfully!!!");
});

//getSingleBlog
const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await Blog.findById(id);
  res.json(data);
});

//getAll
const getAll = asyncHandler(async (req, res) => {
  try {
    const getall = await Blog.find();
    res.json(getall);
  } catch (error) {
    throw new Error("Error....");
  }
});

//AdminInactive
const adminBlogInactive = async (req, res) => {
  try {
    const member = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "Inactive" },
      { new: true }
    );
    if (member) {
      res.json("Success");
    } else {
      res.json("Blog member not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//Adminactive
const adminBlogActive = async (req, res) => {
  try {
    const member = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "Active" },
      { new: true }
    );
    if (member) {
      res.json("Success");
    } else {
      res.json("Blog member not found");
    }
  } catch (error) {
    console.log(error);
    res.json("Failed");
  }
};

//AdminDelete
const adminBlogDelete = async (req, res) => {
  try {
    const user = await Blog.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete user." });
  }
};

//Adminedit
const adminBlogEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    if (req.file) {
      const { buffer, mimetype } = req.file;
      const compressedImage = await sharp(buffer)
        .resize(800)
        .jpeg({ quality: 30 })
        .toBuffer();
      updatedUser.image = {
        data: compressedImage,
        contentType: mimetype,
      };
    }
    Blog.findByIdAndUpdate(id, updatedUser, { new: true }).then((user) => {
      res.json(user);
    });
  } catch {
    res.json("Failed");
  }
};

module.exports = {
  createBlog,
  getSingleBlog,
  getAll,
  adminBlogActive,
  adminBlogInactive,
  adminBlogDelete,
  adminBlogEdit,
};
