const express = require('express');
const drugController = require("../controllers/drugController");
const userControlller = require("../controllers/userController");
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
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
.get(userControlller.findById);

module.exports = router;

