const db = require("../models/user");
const { valideSchemaUser } = require("../middleware/user");

module.exports = {
  userExist: async (req, res, next) => {
    try {
      console.log({ body1: req.body });
      const result = await valideSchemaUser.validateAsync(req.body);

      const { _id, fullname, phone, email } = req.body;

      const filter =
        _id == null
          ? {
              $and: [
                {
                  $or: [
                    { fullname },
                    { email },
                    { $and: [{ "phone.number": phone.number }] },
                  ],
                },
                // { active: true },
              ],
            }
          : {
              $and: [
                {
                  $or: [
                    { fullname },
                    { email },
                    { $and: [{ "phone.number": phone.number }] },
                  ],
                },
                { _id: { $ne: _id } },
              ],
            };

      db.findOne(filter, function (err, doc) {
        if (err) next(err);
        if (doc) {
          console.log("409");
          res.status(409).json({
            status: 409,
            message: "A data entry already exists",
          });
        } else next();
      });
    } catch (error) {
      if (error.isJoi == true) error.status = 422;
      next(error);
    }
  },
};
