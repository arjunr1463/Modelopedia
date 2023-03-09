const contactus = require("../../models/contactus/contactus");

//createContactus
createContactus = async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;
  try {
    const user = new contactus({ name, email, mobile, subject, message });
    await user.save();
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { createContactus };
