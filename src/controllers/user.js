const model = require("../models/user");
const { sendSMS } = require("../services/envoie");
const { cryptPassword } = require("../services/utils");
const { signAccesToken } = require("../services/jwt_service");
const { codevalidation } = require("../services/envoie");

/*
 # afficher tous les clients.
*/
module.exports.users = async (req, res, next) => {
  try {
    const { active = true, offset = 1, limit = 100 } = req.query;
    const users = await model.find({ active }).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

/*
 # Add user with params [fullname,email, phone Number,password].
*/
module.exports.save = async (req, res, next) => {
  try {
    const value = new model(req.body);
    const user = await value.save();
    res.send(user);
  } catch (err) {
    next(err);
  }
};

// module.exports = {
//   // users: (req, res, next) => {
//   //   model
//   //     .find(function (err, doc) {
//   //       if (err) next(err);
//   //       res.send({
//   //         status: 200,
//   //         doc,
//   //       });
//   //     })
//   //     .sort({ _id: -1 });
//   // },
//   signin: async (req, res, next) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     model.findOne({ email }, async function (err, user) {
//       if (err) next(err);
//       if (!user) {
//         res.status(409).json({
//           status: 409,
//           message: "unregistered account.",
//         });
//       } else {
//         const login = await user.comparePassword(password);
//         if (login) {
//           if (!user.active) {
//             res.status(400).json({
//               status: 400,
//               user,
//               message: user.active,
//             });
//           } else {
//             console.log(user._id);
//             const accesToken = await signAccesToken([
//               {
//                 name: user.fullname,
//                 email: user.email,
//                 phone: user.phone,
//               },
//             ]);
//             res.json({
//               status: 200,
//               user,
//               accesToken,
//             });
//           }
//         } else
//           res.status(409).json({
//             status: 409,
//             message: "Email/password incorrect",
//           });
//         // }
//       }
//     });
//   },
//   changeNumberPhone: async (req, res, next) => {
//     const { _id, phone } = req.body;
//     const value = {
//       phone,
//       codeValidation: codevalidation(6),
//     };

//     // console.log(req.body);
//     model.findByIdAndUpdate(
//       { _id },
//       value,
//       { new: true },
//       function (err, find) {
//         if (err) next(err);
//         if (!find)
//           res.status(409).json({
//             doc: "Aucun utilisateur trouver.",
//           });
//         else
//           res.status(200).json({
//             status: 200,
//             find,
//           });
//         //send code
//       }
//     );
//   },

//   resendCode: async (req, res, next) => {
//     const body = {
//       to: "+243999026241",
//       from: "Bin",
//       mssg: "hey test",
//     };
//     sendSMS(body);
//   },
//   /*
//       # Verification du compte.
//       */
//   activeAcount: async (req, res, next) => {
//     const { _id, codeValidation } = req.body;
//     model.findOneAndUpdate(
//       { _id, codeValidation },
//       { active: true },
//       { new: true },
//       function (err, user) {
//         if (err) next(err);
//         if (!user)
//           res.status(404).json({
//             status: 404,
//             message: "Invalid code.",
//           });
//         else res.json({ status: 200, user });
//       }
//     );
//   },
//   update: async (req, res, next) => {
//     const filter = {
//       _id: req.body._id,
//     };

//     delete req.body._id;
//     const values = req.body;

//     model.findByIdAndUpdate(filter, values, { new: true }, function (err, doc) {
//       if (err) next(err);
//       if (!doc)
//         res.status(501).json({
//           doc: "Entreprise not Found.",
//         });
//       else
//         res.json({
//           doc,
//         });
//     });
//   },
//   changePassword: async (req, res, next) => {
//     const filter = { _id: req.body._id };
//     const values = { password: await cryptPassword(req.body.password) };

//     model.findByIdAndUpdate(filter, values, { new: true }, function (err, doc) {
//       if (err) next(err);
//       if (!doc)
//         res.status(501).json({
//           doc: "User not Found.",
//         });
//       else
//         res.json({
//           doc,
//         });
//     });
//   },
//   compteCrypto: async (body) => {
//     const { _id, compte } = body;
//     // delete req.body._id;
//     model.findByIdAndUpdate(
//       _id,
//       { $push: { compte } },
//       { new: true },
//       function (err) {
//         if (err) return false;
//         else return true;
//       }
//     );
//   },
//   updateCompteCrypto: async (req, res, next) => {
//     const { _id, compte } = req.body;
//     delete req.body._id;

//     model.updateOne(
//       { _id },
//       {
//         $set: {
//           "compte.$.name": name,
//           "compte.$.seddingAddress": seddingAddress,
//         },
//       },
//       { new: true },
//       function (err, result) {
//         if (!err) {
//           res.status(200).json({
//             status: 200,
//             doc: result,
//           });
//         } else {
//           res.status(501).json({
//             status: 501,
//             doc: "Modification failure.",
//           });
//         }
//       }
//     );
//   },
//   delete: async (req, res, next) => {
//     model.findByIdAndUpdate(
//       { _id: req.query._id },
//       { delete: true, active: false },
//       function (err, doc) {
//         if (err) next(err);
//         if (!doc)
//           res.status(501).json({
//             status: 501,
//             doc: "Delete failure.",
//           });
//         else
//           res.json({
//             status: 501,
//             doc: "Acount delete suceffuly.",
//           });
//       }
//     );
//   },
// };
