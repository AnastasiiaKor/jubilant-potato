const { ctrlWrapper, sendEmail } = require("../helpers");

const sendMail = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0"); // добавляем нуль перед числами < 10
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear();
  const formattedDate = `${month}.${day}.${year}`;
  const mail = {
    to: "inkedbyalina@gmail.com",
    subject: `${name}`,
    html: `
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Address:</b> ${address}</p>
  `,
    attachments: [
      {
        content: req.files[0].buffer.toString("base64"),
        filename: `Waiver form ${name} - ${formattedDate}`,
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
