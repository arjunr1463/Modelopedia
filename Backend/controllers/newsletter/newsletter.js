const newsletter = require("../../models/newsletter/newsletter");
const nodemailer = require("nodemailer");

const createNewsletter = async (req, res) => {
  try {
    const email = req.body.email;
    const findData = await newsletter.findOne({ email });
    if (findData) {
      res.json("Already subscribed");
    } else {
      const newSubscriber = new newsletter({ email });
      await newSubscriber.save();
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
        subject: "Welcome to our newsletter",
        text: "Thank you for subscribing to our newsletter!",
      };

      await transporter.sendMail(mailOptions);

      res.json("Successfully subscribed");
    }
  } catch {
    res.json("Please fill the email field");
  }
};

module.exports = { createNewsletter };
