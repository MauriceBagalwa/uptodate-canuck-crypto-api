const bcrypt = require("bcryptjs");

module.exports = {
  cryptPassword: async function (psswd) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(psswd, salt);
    return hash;
  },
};
