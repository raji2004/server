require("dotenv").config();
const express = require("express");
const path = require("path");
const nodeMail = require("nodemailer");
const { contact } = require("./contact");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.pass,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: subject,
    html: `You got a message from 
      Email : ${email} <br>
      Name: ${name} <br>
      Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

app.post("/", async (req, res, next) => {
  const { yourname, youremail, yoursubject, yourmessage } = req.body;
  try {
    await mainMail(yourname, youremail, yoursubject, yourmessage);

    res.send("Message Successfully Sent!");
  } catch (error) {
    console.log(error);
    res.send("Message Could not be Sent");
  }
});
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.listen(process.env.port, () => console.log("Server is running!"));
