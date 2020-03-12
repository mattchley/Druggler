const express = require('express');
const drugController = require("../controllers/drugController");
const userControlller = require("../controllers/userController");
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You are now logged in.",
    // user values passed through from auth middleware
    user: req.user
  });
});

router.route("/drugs")
.get(drugController.findAll)
.post(drugController.create);

router.route("/drugs/:id")
.get(drugController.findById)
.put(drugController.update)
.delete(drugController.remove);

router.route("/user/:id")
.get(userControlller.findById)

router.route("/user")
.put(userControlller.update);

router.route("/user/drugs/:id")
.get(drugController.findByUser)

module.exports = router;

