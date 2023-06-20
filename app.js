require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const nodeMail = require("nodemailer");
// const { contact } = require("./contact");
const User = require('./user')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());



async function mainMail(name, email,) {
  const transporter = await nodeMail.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false
     }
  });
  const mailOption = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Welcome to Talo - Your Journey to Success Begins Here!",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial,'helvetica neue',helvetica,sans-serif">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Talo</title><!--[if (mso 16)]>
    <style type="text/css">a{text-decoration:none}</style>
    <![endif]--><!--[if gte mso 9]><style>sup{font-size:100%!important}</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">#outlook a{padding:0}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}@media only screen and (max-width:600px){p,ul li,ol li,a{line-height:150%!important}h1,h2,h3,h1 a,h2 a,h3 a{line-height:120%}h1{font-size:30px!important;text-align:center}h2{font-size:24px!important;text-align:left}h3{font-size:20px!important;text-align:left}.es-header-body h1 a,.es-content-body h1 a,.es-footer-body h1 a{font-size:30px!important;text-align:center}.es-header-body h2 a,.es-content-body h2 a,.es-footer-body h2 a{font-size:24px!important;text-align:left}.es-header-body h3 a,.es-content-body h3 a,.es-footer-body h3 a{font-size:20px!important;text-align:left}.es-menu td a{font-size:14px!important}.es-header-body p,.es-header-body ul li,.es-header-body ol li,.es-header-body a{font-size:14px!important}.es-content-body p,.es-content-body ul li,.es-content-body ol li,.es-content-body a{font-size:14px!important}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li,.es-footer-body a{font-size:14px!important}.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li,.es-infoblock a{font-size:12px!important}*[class="gmail-fix"]{display:none!important}.es-m-txt-c,.es-m-txt-c h1,.es-m-txt-c h2,.es-m-txt-c h3{text-align:center!important}.es-m-txt-r,.es-m-txt-r h1,.es-m-txt-r h2,.es-m-txt-r h3{text-align:right!important}.es-m-txt-l,.es-m-txt-l h1,.es-m-txt-l h2,.es-m-txt-l h3{text-align:left!important}.es-m-txt-r img,.es-m-txt-c img,.es-m-txt-l img{display:inline!important}.es-button-border{display:inline-block!important}a.es-button,button.es-button{font-size:18px!important;display:inline-block!important}.es-adaptive table,.es-left,.es-right{width:100%!important}.es-content table,.es-header table,.es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0!important}.es-m-p0r{padding-right:0!important}.es-m-p0l{padding-left:0!important}.es-m-p0t{padding-top:0!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}tr.es-desk-hidden,td.es-desk-hidden,table.es-desk-hidden{width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}tr.es-desk-hidden{display:table-row!important}table.es-desk-hidden{display:table!important}td.es-desk-menu-hidden{display:table-cell!important}.es-menu td{width:1%!important}table.es-table-not-adapt,.esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}.es-desk-hidden{display:table-row!important;width:auto!important;overflow:visible!important;max-height:inherit!important}.es-m-p5{padding:5px!important}.es-m-p5t{padding-top:5px!important}.es-m-p5b{padding-bottom:5px!important}.es-m-p5r{padding-right:5px!important}.es-m-p5l{padding-left:5px!important}.es-m-p10{padding:10px!important}.es-m-p10t{padding-top:10px!important}.es-m-p10b{padding-bottom:10px!important}.es-m-p10r{padding-right:10px!important}.es-m-p10l{padding-left:10px!important}.es-m-p15{padding:15px!important}.es-m-p15t{padding-top:15px!important}.es-m-p15b{padding-bottom:15px!important}.es-m-p15r{padding-right:15px!important}.es-m-p15l{padding-left:15px!important}.es-m-p20{padding:20px!important}.es-m-p20t{padding-top:20px!important}.es-m-p20r{padding-right:20px!important}.es-m-p20l{padding-left:20px!important}.es-m-p25{padding:25px!important}.es-m-p25t{padding-top:25px!important}.es-m-p25b{padding-bottom:25px!important}.es-m-p25r{padding-right:25px!important}.es-m-p25l{padding-left:25px!important}.es-m-p30{padding:30px!important}.es-m-p30t{padding-top:30px!important}.es-m-p30b{padding-bottom:30px!important}.es-m-p30r{padding-right:30px!important}.es-m-p30l{padding-left:30px!important}.es-m-p35{padding:35px!important}.es-m-p35t{padding-top:35px!important}.es-m-p35b{padding-bottom:35px!important}.es-m-p35r{padding-right:35px!important}.es-m-p35l{padding-left:35px!important}.es-m-p40{padding:40px!important}.es-m-p40t{padding-top:40px!important}.es-m-p40b{padding-bottom:40px!important}.es-m-p40r{padding-right:40px!important}.es-m-p40l{padding-left:40px!important}}</style>
    </head>
    <body data-new-gr-c-s-loaded="14.1082.0" style="width:100%;font-family:arial,'helvetica neue',helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#ECEFF4"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#eceff4"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#ECEFF4">
    <tr>
    <td valign="top" style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
    <tr>
    <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:337px" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
    <tr>
    <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:337px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img src="https://gaojfe.stripocdn.email/content/guids/aa914a69-689d-482a-b84f-4252fd506eb8/images/frame_2.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="30" title="Logo"></a></td>
    </tr>
    </table></td>
    </tr>
    </table><!--[if mso]></td><td style="width:20px"></td><td style="width:203px" valign="top"><![endif]-->
    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
    <tr>
    <td align="left" style="padding:0;Margin:0;width:203px">
    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#333333" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#333333;border-radius:8px" role="presentation">
    <tr>
    <td style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="links-images-left">
    <td align="center" valign="top" width="100%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="https://talojobs.netlify.app" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:roboto,'helvetica neue',helvetica,arial,sans-serif;color:#fff;font-size:14px;font-weight:normal"><img src="https://gaojfe.stripocdn.email/content/guids/CABINET_b5f8b61b48868ddc8869c68d48aab1164ac7c2de46150334bd9ae34b58b7e49e/images/link_Cyb.png" alt="Website" title="Website" align="absmiddle" width="16" style="display:inline-block!important;border:0;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">Website</a></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table><!--[if mso]></td></tr></table><![endif]--></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
    <tr>
    <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:14px"><img class="adapt-img" src="https://gaojfe.stripocdn.email/content/guids/aa914a69-689d-482a-b84f-4252fd506eb8/images/mail.png" alt="Secret mail" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="560" title="Secret mail"></a></td>
    </tr>
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:roboto,'helvetica neue',helvetica,arial,sans-serif;font-size:17px;font-style:normal;font-weight:normal;color:#2E3440">Thanks for signing up,</h3></td>
    </tr>
    <tr>
    <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><h1 style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:40px;font-style:normal;font-weight:bold;color:#2E3440">You’ve been added to the waitlist</h1></td>
    </tr>
    <tr>
    <td align="left" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto,'helvetica neue',helvetica,arial,sans-serif;line-height:21px;color:#2e3440;font-size:14px">We are thrilled to have you join Talo! Thank you for signing up for our platform and being a part of our community. With Talo, you will be able to access personalized job opportunities and career resources to help you achieve your professional goals.<br>If you have any questions or need assistance, please do not hesitate to reach out to our customer support team. We are here to help you navigate our platform and get the most out of your Talo experience.<br>Thank you again for joining Talo. We look forward to helping you take your career to the next level.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto,'helvetica neue',helvetica,arial,sans-serif;line-height:21px;color:#2e3440;font-size:14px"><br>Best regards,<br>The Talo Team</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
    <tr>
    <td align="left" style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://gaojfe.stripocdn.email/content/guids/CABINET_b5f8b61b48868ddc8869c68d48aab1164ac7c2de46150334bd9ae34b58b7e49e/images/dark_blue_and_marble_mockup.png" alt="image of website landing page" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" width="600" title="image of website landing page"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr>
    <td align="center" style="padding:0;Margin:0">
    <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D8DEE9;width:600px">
    <tr>
    <td align="left" bgcolor="#000c39" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#000c39">
    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="left" style="padding:0;Margin:0;width:560px">
    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:20px;font-size:0">
    <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
    <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://twitter.com/TaloJobs" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Twitter link" src="https://gaojfe.stripocdn.email/content/assets/img/social-icons/logo-white/twitter-logo-white.png" alt="Tw" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
    <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.instagram.com/talojobs/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#2E3440;font-size:12px"><img title="Instagram " src="https://gaojfe.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png" alt="Instagram link" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
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
    const user = await new User({ FirstName: fname, LastName: lname, Phone_Number: number, Email: email }).save()
    const name = fname + " " + lname;
    mainMail(name, email);

    res.send(`user ${user.FirstName} has signed up successfully`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
app.put('/',async(req,res)=>{
  const { fname, lname, email, number } = req.body;
  const name = fname + " " + lname;
 return await mainMail(name,email)
})
app.get("/", (req, res) => {
  res.send("<h1>hello talo edit</h1>");
});
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log(`error connecting to database: ${e}`);
  });


app.listen(3000, () => console.log("Server is running"));
