const { ctrlWrapper, sendEmail } = require("../helpers");

const sendMail = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const mail = {
    to: "anastasiya.kormilitsina@gmail.com",
    subject: `${name}`,
    html: `
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Address:</b> ${address}</p>
  `,
    attachments: [
      {
        content: req.files[0].buffer.toString("base64"),
        filename: req.files[0].originalname,
        type: req.files[0].mimetype,
        disposition: "attachment",
      },
    ],
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Email sent",
  });
};

module.exports = {
  sendMail: ctrlWrapper(sendMail),
};
