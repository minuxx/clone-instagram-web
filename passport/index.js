const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.idx);
  });

  passport.deserializeUser((idx, done) => {
    User.findOne({ where: { idx } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
