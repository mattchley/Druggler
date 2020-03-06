const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/druggler");

const drugSeed = [
  {
    name: "tylenol",
    lastTaken: "01/01/2020",
    frequency: 6,
    date: new Date(Date.now()),
    users: {}
  },
  {
    name: "morphine",
    lastTaken: "01/01/2020",
    frequency: 6,
    date: new Date(Date.now()),
    users: {}
  }
];
db.Drugs.remove({})
  .then(() => db.Drugs.collection.insertMany(drugSeed))
  .then(data => {
    console.log(data.result.n + " drugs inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
