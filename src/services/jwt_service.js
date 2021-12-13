const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccesToken: (userId) => {
    console.log(userId);
    return new Promise((resolve, reject) => {
      const paylod = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;

      const options = {
        expiresIn: "1h",
        issuer: "pickuIpage.com",
        audience: userId,
      };
      JWT.sign(paylod, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
