const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugsSchema = new Schema({
  name: { type: String, required: true },
  lastTaken: { type: String, required: true },
  frequency: Number,
  date: { type: Date, default: Date.now },
  users: { type: Schema.Types.ObjectId, ref: "Users" }
});

const Drugs = mongoose.model('Drugs', drugsSchema);

module.exports = Drugs;
