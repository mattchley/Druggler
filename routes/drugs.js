const router = require("express").Router();
const drugController = require("../controllers/drugController");

router.route("/")
.get(drugController.findAll)
.post(drugController.create);

router.route("/:id")
.get(drugController.findById)
.put(drugController.update)
.delete(drugController.remove);

module.exports = router;
