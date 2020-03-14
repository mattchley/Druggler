const User = require("../models/user");
const Drugs = require("../models/drugs");

// Defining methods for the booksController
module.exports = {

  findAll: function(req, res) {
    User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
      console.log(req.params)
    User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
      console.log(req.body)
    Drugs
    .find({user: req.body.user._id})
    .then(res => {
      const allDrugId = res.map(drug => drug._id)      
      User
        .findOneAndUpdate({ _id: req.body.user._id }, {$set:{drugs:allDrugId}})
        .then(dbModel => {
            console.log("user drugs array respnose: ", dbModel)
            res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }).catch(err => res.status(422).json(err))
  }
};
