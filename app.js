require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const nodeMail = require("nodemailer");
// const { contact } = require("./contact");
const User = require('./user')

const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.post("/", async (req, res) => {
  const { fname, lname, email, number } = req.body;
  try {
    console.log(req.body)
    const user = await new User({ FirstName: fname, LastName: lname, Phone_Number: number, Email: email }).save()
    const name = fname + " " + lname;
    await mainMail(name, email, number);

    res.send(`user ${user.FirstName} has signed up successfully`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("<h1>hello talo edit</h1>");
});
mongoose
  .connect(process.env.Database_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(`error connecting to database: ${e}`);
  });


app.listen(3000, () => console.log("Server is running!"));
