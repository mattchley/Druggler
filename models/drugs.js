const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
//const User = require("./user");

const drugsSchema = new Schema({
  name: { 
    type: String, 
    required: [true, "Drug name is required"]
  },
  lastTakenDate: { 
    type: String, 
    required: true },
  lastTakenTime: { type: String, required: true},
  frequency: Number,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Drugs = mongoose.model("Drugs", drugsSchema);

module.exports = Drugs;
