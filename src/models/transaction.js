const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  beneficiary: { type: Schema.Types.ObjectId, ref: "User" },
  montant: { type: Number },
  devise: { type: String, default: "USD" },
  cryptomonnaie: [{ type: Schema.Types.ObjectId, ref: "User." }],
});

module.exports = mongoose.model("Transaction", transactionSchema);
