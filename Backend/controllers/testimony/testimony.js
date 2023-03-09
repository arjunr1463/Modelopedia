const Testimony = require("../../models/testimony/testimony");
const asyncHandler = require("express-async-handler");
const sharp = require('sharp');

//create Testimony
const createTestimony = asyncHandler(async (req, res) => {
  try {
    const newdata = await new Testimony({
      fullname: req.body.fullname,
      companyname: req.body.companyname,
      discription: req.body.discription,
    });
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 500 })
      .jpeg({ quality: 30 })
      .toBuffer();
    newdata.image.data = resizedImageBuffer;
    newdata.image.contentType = 'image/jpeg';

    await newdata.save();

    res.json("Testimony created successfully!!!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create testimony' });
  }
});

//getAll
const getAllTestimony = asyncHandler(async (req, res) => {
  try {
    const getall = await Testimony.find();
    res.json(getall);
  } catch (error) {
    throw new Error("Error....");
  }
});

//AdminInactive
const adminTestiInactive = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Testimony.findByIdAndUpdate(id);
    if (member) {
      member.status = "Inactive";
      member.save();
      res.json("Success");
    } else {
      res.json("Testimony member not found");
    }
  } catch (error) {
    res.json("Failed");
    console.log(error);
  }
};

//Adminactive
const adminTestiActive = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Testimony.findByIdAndUpdate(id);
    if (member) {
      member.status = "Active";
      member.save();
      res.json("Success");
    } else {
      res.json("Testimony member not found");
    }
  } catch (error) {
    res.json("Failed");
    console.log(error);
  }
};

//AdminDelete
const adminTestiDelete = async (req, res) => {
  const id = req.params.id;
  Testimony.findByIdAndDelete(id)
    .then((user) => {
      res.json(user);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Unable to delete user." });
    });
};

//Adminedit
const adminTestiEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    if (req.file) {
      const imageBuffer = await sharp(req.file.buffer)
        .resize(500, 500, { fit: 'inside' })
        .toBuffer();

      updatedUser.image = {
        data: imageBuffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedTestimony = await Testimony.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedTestimony);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update testimony' });
  }
};

module.exports = {
  createTestimony,
  getAllTestimony,
  adminTestiInactive,
  adminTestiActive,
  adminTestiDelete,
  adminTestiEdit,
};
