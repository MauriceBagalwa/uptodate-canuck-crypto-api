const Joi = require("joi");
const model = require("../models/user");

const valideSchemaUser = Joi.object({
  fullname: Joi.string().required(),
  phone: Joi.object()
    .keys({
      code: Joi.string().required(),
      number: Joi.number().required(),
    })
    .required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  physicalAddress: Joi.string(),
});

const validePhone = Joi.object({
  _id: Joi.string().required(),
  phone: Joi.object()
    .keys({
      code: Joi.string().min(2).max(4).required(),
      number: Joi.number().min(5).required(),
    })
    .required(),
});

const numberPhoneExist = async (req, res, next) => {
  try {
    const body = await validePhone.validateAsync(req.body);
    const { _id, phone } = body;

    model.findOne(
      { "phone.number": phone.number, active: true, _id: { $ne: _id } },
      function (err, find) {
        if (err) next(err);
        if (find) {
          res.status(404).json({
            status: 404,
            message: "Le numéro de téléphone saisie est déjà utilser:",
          });
        } else {
          next();
        }
      }
    );
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};
module.exports = { valideSchemaUser, validePhone, numberPhoneExist };
