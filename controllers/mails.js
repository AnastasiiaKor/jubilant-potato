const { ctrlWrapper, sendEmail } = require("../helpers");

const sendMail = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
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

const sendConfirmation = async (req, res) => {
  const { name, email, tip, total, amount, taxes } = req.body;

  const confirmation = {
    to: "inkedbyalina@gmail.com",
    subject: `Payment Confirmation from ${name}`,
    html: `Dear Alina, 

<p>We are writing to confirm the successful processing of a recent payment made by ${name}. 
Below are the details of the transaction:</p>

<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Amount:</b> ${amount}</p>
<p><b>Tip: </b>${tip}</p>
<p><b>Taxes:</b> ${taxes}</p>
<p><b>Total: </b> ${total}</p>
The payment has been successfully processed for the specified amount.
  `,
  };

  await sendEmail(confirmation);

  res.status(200).json({
    message: "Confirmation sent",
  });
};

module.exports = {
  sendMail: ctrlWrapper(sendMail),
  sendConfirmation: ctrlWrapper(sendConfirmation),
};
