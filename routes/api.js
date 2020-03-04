const express = require('express');
const drugRoutes = require("./drugs");
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

router.use("/drugs",drugRoutes);

module.exports = router;
