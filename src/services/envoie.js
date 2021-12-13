var axios = require("axios");
var qs = require("qs");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "manager@uptodatedevelopers.com", // generated ethereal user
    pass: "uQ5_rPXsmzUhWRh", // generated ethereal password
  },
});

var codevalidation = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};
module.exports = {
  sendSMS: function (req, res, next) {
    var data = qs.stringify({
      to: req.to,
      from: req.from,
      dcs: "0",
      text: req.mssg,
      // sched: "Time-IsoFormat",
    });

    var config = {
      method: "post",
      url: "https://api.floppy.ai/sms",
      headers: {
        "x-api-key": "2d5d2dc61537",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // res.json({ Error: error });
      });
  },
  sendEmail: async (body, res, next) => {
    const { to, subject, text, html } = body;

    let mailOptions = await transporter.sendMail({
      from: "manager@uptodatedevelopers.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    transporter.sendMail(mailOptions, function (err, doc) {
      if (err) next(err);
      res.json(doc);
    });
  },
  codevalidation,
};
