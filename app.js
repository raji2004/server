require("dotenv").config();
const express = require("express");
const path = require("path");
const nodeMail = require("nodemailer");
// const { contact } = require("./contact");
const User = require('./user')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, number,) {
  const transporter = await nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOption = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: number,
    html: `You got a message from 
    Email : ${email} <br>
    Name: ${name} <br>
    `,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

app.post("/", async (req, res, next) => {
  const { fname, lname,email,number } = req.body;
  try {
    const user = await new User({FirstName:fname,LastName:lname,Phone_Number:number,Email:email}).save()
    const name = fname + " " + lname;
    await mainMail(name, email, number);

    res.send(`user ${user.FirstName} has signed up successfully`);
  } catch (error) {
    console.log(error);
    res.send("Message Could not be Sent");
  }
});
app.get("/", (req, res) => {
  res.send("<h1>hello talo edit</h1>");
});

app.listen(process.env.port, () => console.log("Server is running!"));
