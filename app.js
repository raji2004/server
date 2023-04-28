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

async function mainMail(name, email,) {
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
    subject: name,
    html: `<!DOCTYPE html>
    <html lang=en>
    <head>
    <meta charset=UTF-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width, initial-scale=1.0">
    <link rel=stylesheet href=https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css integrity=sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65 crossorigin=anonymous>
    <link href=https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css rel=stylesheet />
    <link href=https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css rel=stylesheet />
    <link rel=icon type=image/svg+xml href=./img/talo.svg />
    <title>Talo</title>
    <style>@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,600&display=swap');body{font-family:'Raleway',sans-serif;background-image:url('./img/bg.png');background-position:center;background-size:cover;margin:auto;scroll-behavior:smooth;color:#0b0d17}h1{margin-top:15px;margin-bottom:30px;font-size:4em;margin-left:25px;font-weight:700;color:#0f4e2f}h5{font-weight:630}.text p{font-weight:500}.text{margin-left:15px}hr{background-color:#fff;color:#fff;height:1.2px}</style>
    </head>
    <body>
    <section class="container m-5">
    <div class="container bg-light p-3 m-auto rounded w-75">
    <div class=rounded>
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo.png?alt=media&token=2753f402-137e-484d-b586-35765f3c794e" alt="logo of talo" width=08%>
    </div>
    <div class="mx-auto mt-3">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/mail.png?alt=media&token=03a5e1a6-2a25-4f07-9620-6a5dc167cab0" alt="illustration of people opening a mail" class=w-100>
    </div>
    <div class="text mt-5 w-75">
    <h5>Thanks for Signing Up,</h5>
    <h1 style="font-size:40px">You've been added to the waitlist.</h1>
    <p>Dear ${name}, <br>
    We are thrilled to have you join Talo! Thank you for signing up for our platform and being a part of
    our community.
    With Talo, you will be able to access personalized job opportunities and career resources to help
    you achieve your professional goals.
    <br>
    If you have any questions or need assistance, please do not hesitate to reach out to our customer
    support team. We are here to help you navigate our platform and get the most out of your Talo
    experience.
    <br>
    Thank you again for joining Talo. We look forward to helping you take your career to the next level.
    <br>
    Best regards, <br>
    The Talo Team
    </p>
    </div>
    </div>
    </section>
    <hr>
    <footer class="container text-white">
    <h5>Contact</h5>
    <div class="row mt-3">
    <p> <span> <i class="fa-solid fa-location-dot" style=color:#fff></i></span> Collective Lab, Nile
    University, Abuja,</p>
    </div>
    </footer>
    </body>
    <script src=https://cdn.jsdelivr.net/npm/solar-icon-set@1.0.0/dist/index.min.js></script>
    <script src=https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js></script>
    <script src=https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js></script>
    <script src=main.js></script>
    </html>
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
    const delet = await User.deleteMany({fname})
    const user = await new User({ FirstName: fname, LastName: lname, Phone_Number: number, Email: email }).save()
    const name = fname + " " + lname;
    await mainMail(name, email);

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
