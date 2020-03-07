const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User = require("./user");

const drugsSchema = new Schema({
  name: { type: String, required: true },
  lastTaken: { type: String, required: true },
  frequency: Number,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Drugs = mongoose.model('Drugs', drugsSchema);

module.exports = Drugs;
