const Award = require("../../models/awards/awards");

//create awards
const createAwards = async (req, res) => {
  try {
    const award = await Award.findOne(); 
    if (award) {
      award.Awards = req.body.awards;
      await award.save();
      res.json("Award updated successfully");
    } else {
      const newAward = new Award({
        Awards: req.body.awards,
      });
      await newAward.save();
      res.json("Award created successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//get awards
const getAwards = async (req, res) => {
  try {
    const awards = await Award.find();
    res.json(awards);
  } catch {
    res.json("Failed");
  }
};

module.exports = { createAwards,getAwards };
