const model = require("../models/cryptocurrency");

module.exports = {
  crypto: async (req, res, next) => {
    await new model(req.body).save(function (err, cryptocurrency) {
      if (err) next(err);
      res.json({ status: 200, cryptocurrency });
    });
  },
  cryptos: async (req, res, next) => {
    model.find(function (err, cryptocurrency) {
      if (err) next(err);
      res.json({ status: 200, cryptocurrency });
    });
  },
  cryptoOfUser: async (req, res, next) => {
    await model.find({ user: req.query.user }, function (err, cryptocurrency) {
      if (err) next(err);
      res.json({ status: 200, cryptocurrency });
    });
  },
  update: async (req, res, next) => {
    const { _id } = req.body;
    delete req.body._id;
    model.findByIdAndUpdate(
      { _id },
      req.body,
      { new: true },
      function (err, cryptocurrency) {
        if (err) next(err);
        if (!cryptocurrency)
          res.json({ status: 404, message: "cryptocurrency not found." });
        else res.json({ status: 200, cryptocurrency });
      }
    );
  },
  delete: async (req, res, next) => {
    model.delete({ _id: req.query._id }, function (err, cryptocurrency) {
      if (err) next(err);
      if (!cryptocurrency)
        res.json({ status: 404, message: "cryptocurrency not found." });
      else
        res.json({
          status: 200,
          cryptocurrency: "The cryptocurrency account successfully deleted.",
        });
    });
  },
};
