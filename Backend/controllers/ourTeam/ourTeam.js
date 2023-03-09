const ourTeam = require("../../models/ourTeam/ourTeam");
const sharp = require("sharp");

//create Team
const createTeam = async (req, res) => {
  try {
    const { name, designation, selectmember, description } = req.body;
    const imageBuffer = await sharp(req.file.buffer)
      .resize(600, 600)
      .jpeg({ quality: 30 })
      .toBuffer();
    const newdata = new ourTeam({
      name,
      designation,
      selectmember,
      description,
      image: {
        data: imageBuffer,
        contentType: req.file.mimetype,
      },
    });
    await newdata.save();
    res.json("Successfully created");
  } catch (err) {
    console.log(err);
    res.json("Failed to create team member");
  }
};

//getAll
const getAllOurTeam = async (req, res) => {
  try {
    const data = await ourTeam.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

//get single team
const getSingleTeam = async (req, res) => {
  const data = await ourTeam.find();
  res.json(data);
};
//get by Id
const getByMember = async (req, res) => {
  const { selectmember } = req.params;
  const data = await ourTeam.find({ selectmember: selectmember });
  res.json(data);
};

//AdminInactive
const adminInactive = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await ourTeam.findById(id);
    if (member) {
      member.status = "Inactive";
      member.save();
      res.json("Success");
    } else {
      res.json("OurTeam member not found");
    }
  } catch (error) {
    res.json("Failed");
    console.log(error);
  }
};

//Adminactive
const adminActive = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await ourTeam.findById(id);
    if (member) {
      member.status = "Active";
      member.save();
      res.json("Success");
    } else {
      res.json("OurTeam member not found");
    }
  } catch (error) {
    res.json("Failed");
    console.log(error);
  }
};

//AdminDelete
const adminDelete = async (req, res) => {
  const id = req.params.id;
  ourTeam
    .findByIdAndDelete(id)
    .then((user) => {
      res.json(user);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Unable to delete user." });
    });
};

//Adminedit
const adminEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    if (req.file) {
      const imageBuffer = await sharp(req.file.buffer)
        .resize(600,600)
        .jpeg({ quality: 30 })
        .toBuffer();
      updatedUser.image = {
        data: imageBuffer,
        contentType: req.file.mimetype,
      };
    }
    ourTeam.findByIdAndUpdate(id, updatedUser, { new: true }).then((user) => {
      res.json(user);
    });
  } catch {
    res.json("Failed");
  }
};

module.exports = {
  createTeam,
  getSingleTeam,
  getByMember,
  getAllOurTeam,
  adminInactive,
  adminActive,
  adminDelete,
  adminEdit,
  adminDelete,
};
