const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const axios = require("axios");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  fullname: {
    type: String,
    lowercase: true,
    require: true,
  },
  phone: {
    code: { type: String, require: [true, "code phone is required"] },
    number: { type: String, require: [true, "code phone is required"] },
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Please fill a valid email address."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  physicalAddress: { type: String, lowercase: true },
  compte: [{ type: Schema.Types.ObjectId, ref: "Cryptocurrency" }],
  password: { type: String },
  codeValidation: { type: String },
  active: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

// Functions
/**
 * Generate code validation
 */
var codevalidation = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

// const axios = axios.create({
//   baseURL: "https://some-domain.com/api/",
// //   timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
// });
var sendSMS = function (code, number) {
  //   const { message, number, from } = req.body;

  const item = {
    username: "danbdana2019",
    psswd: "esm702",
    from: "Canuck",
    to: `${this.phone.code}${this.phone.number}`,
    message,
    type: 0,
  };

  console.log(item);
};

userSchema.pre("save", async function (next) {
  //Encrypt psswd
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  // generate code validation
  this.codeValidation = codevalidation(6);
  next();
});

// userSchema.post("save", async function (next) {
//   const item = {
//     username: "danbdana2019",
//     psswd: "esm702",
//     from: "Canuck",
//     to: `${this.phone.code}${this.phone.number}`,
//     message: `votre code de confirmation est ${this.code}`,
//     type: 0,
//   };

//   url = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${item.username}&password=${item.psswd}
//   &from=${item.from}&to=${item.to}&text=${item.message}&type=${item.type}`;

//   try {
//     const res = await axios.get(url);
//     return res.data;
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
