const express = require("express");
const { noExtendLeft } = require("sequelize/dist/lib/operators");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/auth");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

module.exports = router;
