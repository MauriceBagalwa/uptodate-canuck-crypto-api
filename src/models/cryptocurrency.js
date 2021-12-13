const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { compteCrypto } = require("../controllers/user");

const cryptocurrencySchema = new Schema({
  name: { type: String },
  seddingAddress: { type: String },
  receveAddress: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

cryptocurrencySchema.post("save", function (doc) {
  if (!compteCrypto(doc._id)) console.log("Error ....");
  else console.log("%s has been saved from the db", doc._id);
});

module.exports = mongoose.model("Cryptocurrency", cryptocurrencySchema);
