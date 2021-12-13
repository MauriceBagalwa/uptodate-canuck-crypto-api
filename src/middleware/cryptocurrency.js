const Joi = require("joi");
const model = require("../models/cryptocurrency");

const valideSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  seddingAddress: Joi.string().required(),
  receveAddress: Joi.string().required(),
});

const isExist = async (req, res, next) => {
  const { user, name, seddingAddress, receveAddress } = req.body;
  model.findOne(
    {
      $and: [
        { user },
        { $or: [{ name }, { seddingAddress }, { receveAddress }] },
      ],
    },
    function (err, find) {
      if (err) next(err);
      if (find)
        res.status(409).json({
          status: 409,
          message: `Acount ${name} already exists`,
        });
      else next();
    }
  );
};

module.exports = { valideSchema, isExist };
